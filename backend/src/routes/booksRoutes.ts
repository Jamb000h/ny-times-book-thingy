import { Request, Router } from "express";
import booksService from "services/booksService";

const router = Router();

router.get("/listNames", async (_req, res) => {
  try {
    const bestsellerListNames = await booksService.getBestsellerListNames();
    res.json(bestsellerListNames);
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
  // TODO: Maybe validate listName against listNames
  try {
    const bestsellerList = await booksService.getBestsellerList(listName);
    const top10BestsellersForList = bestsellerList
      .sort((book1, book2) => book1.rank - book2.rank)
      .slice(0, 10);
    res.json(top10BestsellersForList);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/reviews/:isbn", async (req: Request, res) => {
  const isbn = req.params.isbn;
  if (!isbn) {
    res.status(400).send("Missing isbn query param");
  }
  try {
    const reviews = await booksService.getReviews(isbn);
    res.json(reviews);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
