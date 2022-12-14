import { Router } from "express";
import { authController } from "../controllers";
import { authValidator } from "../validators";

const authRoutes = Router();

authRoutes.post(
  "/login",
  authValidator.validateUserLogin,
  authController.login
);

authRoutes.post(
  "/register",
  authValidator.validateUserRegister,
  authController.register
);

export { authRoutes };
