import express from "express";
import config from "config";
import bestsellersRouter from "routes/bestsellersRoutes";

const app = express();

app.use("/api/bestsellers", bestsellersRouter);

app.get("/", (_req, res) => res.status(404).send("Not found"));

app.listen(config.port, () => {
  console.log(`Server is running at ${config.port}`);
});
