import { Router } from "express";
import signupController from "../controllers/signup.js";

const signupRouter = Router();

signupRouter.get("/", signupController.renderView);

signupRouter.post("/", signupController.register);

export default signupRouter;
