import { Request, Router } from "express";
import BooksService from "services/BooksService";
import areValidBestsellerLists from "schemas/external/BookService/BestsellerList";
import areValidBooks from "schemas/external/BookService/Book";
import areValidReviews from "schemas/external/BookService/Review";

const booksService = new BooksService();
const router = Router();

router.get("/lists", async (_req, res) => {
  try {
    const bestsellerLists = await booksService.getBestsellerLists();
    if (areValidBestsellerLists(bestsellerLists)) {
      res.json(bestsellerLists);
    }
  } catch (e) {
    // TODO: Better error handling
    res.status(500).send(e);
  }
});

router.get("/list/:listName", async (req: Request, res) => {
  const listName = req.params.listName;

  if (!listName) {
    return res.status(400).send("Missing listName query param");
  }

  try {
    const books = await booksService.getBooksForBestsellerList(listName);
    if (areValidBooks(books)) {
      // Only top 10 is interesting
      const top10BestsellersForList = books
        .sort((book1, book2) => book1.rank - book2.rank)
        .slice(0, 10);

      return res.json(top10BestsellersForList);
    } else {
      return res.status(400).send("Invalid books");
    }
  } catch (e) {
    return res.status(400).send((e as Error).message);
  }
});

router.get("/reviews/:isbn", async (req: Request, res) => {
  const isbn = req.params.isbn;

  if (!isbn) {
    return res.status(400).send("Missing isbn query param");
  }

  try {
    const reviews = await booksService.getReviewsForBook(isbn);

    if (areValidReviews(reviews)) {
      return res.json(reviews);
    } else {
      return res.status(400).send("Invalid reviews");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/", (_req, res) => res.status(404).send("Not found"));

export default router;
