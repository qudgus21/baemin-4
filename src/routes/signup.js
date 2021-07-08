import { Router } from "express";
import signupController from "../controllers/signup.js";

const signupRouter = Router();

signupRouter.get("/register", signupController.registerView);

signupRouter.post("/register", signupController.register);

signupRouter.get("/terms", signupController.terms);

signupRouter.post("/terms", signupController.checkTerms);

export default signupRouter;
