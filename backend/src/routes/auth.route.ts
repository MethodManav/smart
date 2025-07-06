import { Router } from "express";
import { authController } from "../controller/AuthController";
const authRouter = Router();

authRouter.get("/check", authController.checkHealth.bind(authController));
authRouter.post("/x-connect", authController.requestToken.bind(authController));
authRouter.get(
  "/x-callback",
  authController.getAccessToken.bind(authController)
);
authRouter.get("/session", authController.getSession.bind(authController));

export { authRouter };
