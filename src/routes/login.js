import { Router } from "express";
import loginController from "../controllers/login.js";

const loginRouter = Router();

loginRouter.get("/", loginController.renderView);

loginRouter.post("/", loginController.login);

export default loginRouter;
