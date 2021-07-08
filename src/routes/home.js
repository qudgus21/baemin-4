import { Router } from "express";
import homeController from "../controllers/home.js";

const homeRouter = Router();

homeRouter.get("/", homeController.page);

export default homeRouter;
