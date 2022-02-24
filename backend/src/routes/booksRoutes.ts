import { Router } from "express";
import booksService from "services/booksService";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const bestsellerListNames = await booksService.getBestsellerListNames();
    res.json(bestsellerListNames);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
