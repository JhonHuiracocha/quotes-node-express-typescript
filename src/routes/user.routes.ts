import { Router } from "express";
import { userController } from "../controllers";
import { userValidator } from "../validators";

const userRoutes = Router();

userRoutes.post(
  "/",
  userValidator.validateCreateUser,
  userController.createUser
);

userRoutes.get(
  "/:uid",
  userValidator.validateUserId,
  userController.getUserById
);

userRoutes.get(
  "/:uid/quotes",
  userValidator.validateUserId,
  userController.getUserQuotes
);

userRoutes.delete(
  "/:uid",
  userValidator.validateUserId,
  userController.deleteUserById
);

export { userRoutes };
