import { Router } from "express";
import BestsellersController from "controllers/BestsellersController";
import BestsellersService from "services/BestsellersService";

const bestsellersService = new BestsellersService();
const bestsellersController = new BestsellersController(bestsellersService);

const router = Router();

router.get("/:listName", bestsellersController.getBestsellerListByListName);
router.get("/", bestsellersController.listAllBestsellerLists);

export default router;
