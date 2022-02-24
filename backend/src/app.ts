import express from "express";
import config from "config";
import booksRouter from "routes/booksRoutes";

const app = express();

app.use("/books", booksRouter);

app.get("/", (_req, res) => res.status(404).send("Not found"));

app.listen(config.port, () => {
  console.log(`Server is running at ${config.port}`);
});
