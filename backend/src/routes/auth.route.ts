import { Router } from "express";
import { authController } from "../controller/AuthController";
const authRouter = Router();

authRouter.get("/check", authController.checkHealth.bind(authController));
authRouter.post("/login", authController.requestToken.bind(authController));

export { authRouter };
