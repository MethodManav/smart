import { Router } from "express";
import { authController } from "../controller/AuthController";
const authRouter = Router();

authRouter.get("/check", authController.checkHealth.bind(authController));
authRouter.get("/login", authController.login.bind(authController));
authRouter.get(
  "/callback ",
  authController.getAccessToken.bind(authController)
);

export { authRouter };
