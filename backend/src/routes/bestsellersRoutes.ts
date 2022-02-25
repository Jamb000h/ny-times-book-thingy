import { Request, Router } from "express";
import booksService from "services/booksService";

const router = Router();

router.get("/lists", async (_req, res) => {
  try {
    res.json(await booksService.getBestsellerLists());
  } catch (e) {
    // TODO: Better error handling
    res.status(500).send(e);
  }
});

router.get("/list/:listName", async (req: Request, res) => {
  const listName = req.params.listName;

  if (!listName) {
    res.status(400).send("Missing listName query param");
  }

  try {
    // Validate list name against lists from API
    const lists = await booksService.getBestsellerLists();
    const isValidListName = lists.some((list) => list.list_name === listName);

    if (!isValidListName) {
      res.status(400).send("Invalid listName query param");
    }

    // Get books for list
    const books = await booksService.getBooksForBestsellerList(listName);
    const top10BestsellersForList = books
      .sort((book1, book2) => book1.rank - book2.rank)
      .slice(0, 10);

    res.json(top10BestsellersForList);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.get("/reviews/:isbn", async (req: Request, res) => {
  const isbn = req.params.isbn;

  if (!isbn) {
    res.status(400).send("Missing isbn query param");
  }

  try {
    const reviews = await booksService.getReviewsForBook(isbn);

    res.json(reviews);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", (_req, res) => res.status(404).send("Not found"));

export default router;
