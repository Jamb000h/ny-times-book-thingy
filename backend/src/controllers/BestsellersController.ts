import { Request, Response } from "express";
import BestsellersService from "services/BestsellersService";
import areValidBestsellerListNames, {
  BestsellerListNames,
} from "schemas/external/BestsellersService/BestsellerListName";
import isValidBestsellerList, {
  BookDetails,
} from "schemas/external/BestsellersService/BestsellerList";
import areValidReviews, {
  Reviews,
} from "schemas/external/BestsellersService/Review";

class BestsellersController {
  private bestsellersService: BestsellersService;
  // TODO: replace these caches with redis
  // TODO: add invalidation mechanism
  // Idea is about as follows:
  // - We know from API the update schedule for each bestseller list
  // - Store request in cache and on subsequent requests
  //   check if endpoint should have updated
  //   and if so, fetch from endpoint and update cache
  // - Problem is that we don't know when this happens actually so
  //   we may hit the API a lot even though it hasn't updated yet
  // - Possible solution would be to check every hour or so
  private bestsellerListNamesCache: BestsellerListNames;
  private bestsellerListCache: {
    [key: string]: any;
  };
  private reviewCache: { [key: string]: Reviews } = {};

  constructor(bestsellersService: BestsellersService) {
    this.bestsellersService = bestsellersService;
    this.bestsellerListNamesCache = [];
    this.bestsellerListCache = {};
  }

  listAllBestsellerLists = async (_req: Request, res: Response) => {
    if (this.bestsellerListNamesCache.length > 0) {
      // Cache hit
      console.log("Cache hit for bestseller list names");
      return res.json(this.bestsellerListNamesCache);
    }

    try {
      const bestsellerListNames =
        await this.bestsellersService.getBestsellerListNames();

      if (areValidBestsellerListNames(bestsellerListNames)) {
        bestsellerListNames.sort((a, b) =>
          // Sort alphabetically by list name
          a.list_name < b.list_name ? -1 : 1
        );
        this.bestsellerListNamesCache = bestsellerListNames;
        return res.json(bestsellerListNames);
      } else {
        throw new Error("Invalid bestsellerListNames");
      }
    } catch (e) {
      // TODO: Better error handling :)
      return res.status(500).send("Could not get bestseller list names");
    }
  };

  getBestsellerListByListName = async (req: Request, res: Response) => {
    const listName = req.params.listName;

    if (!listName) {
      return res.status(400).send("Missing listName query param");
    }

    if (this.bestsellerListCache[listName]) {
      // Cache hit
      console.log("Cache hit for bestseller list", listName);
      return res.json(this.bestsellerListCache[listName]);
    }

    try {
      const bestsellerList = await this.bestsellersService.getBestsellerList(
        listName
      );
      if (isValidBestsellerList(bestsellerList)) {
        // Only top 10 is interesting
        const top10BestsellersForList = bestsellerList
          .sort((book1, book2) => book1.rank - book2.rank)
          .slice(0, 10)
          .map((book) => {
            return {
              ...book,
              book_details: book.book_details[0],
              reviews: book.reviews[0],
            };
          });

        const top10WithReviews = await Promise.all(
          top10BestsellersForList.map(async (book) => {
            try {
              const reviews = await this.getReviews(
                book.reviews,
                book.book_details
              );
              return {
                ...book,
                reviews,
              };
            } catch {
              return book;
            }
          })
        );

        this.bestsellerListCache[listName] = top10WithReviews;

        return res.json(top10WithReviews);
      } else {
        return res.status(400).send("Invalid bestsellerList");
      }
    } catch (e) {
      return res.status(500).send("Error when fetching bestseller list");
    }
  };

  private async getReviews(reviews: any, bookDetails: BookDetails) {
    const isbn =
      bookDetails.primary_isbn13.length > 0
        ? bookDetails.primary_isbn13
        : bookDetails.primary_isbn10;

    if (this.reviewCache[isbn]) {
      // Cache hit
      console.log("Cache hit for reviews with isbn", isbn);
      return this.reviewCache[isbn];
    }

    const hasReviews = Object.values(reviews).some(
      (review: any) => review.length > 0
    );

    if (!hasReviews) {
      return [];
    }

    try {
      const reviews = await this.bestsellersService.getReviews(isbn);

      if (areValidReviews(reviews)) {
        this.reviewCache[isbn] = reviews;
        return reviews;
      }

      // It seems appropriate to return an empty array here
      return [];
    } catch (e) {
      throw e;
    }
  }
}

export default BestsellersController;
