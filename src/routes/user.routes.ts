import { Router } from "express";
import { userController } from "../controllers";

const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.get("/:uid", userController.getUserById);
userRoutes.get("/:uid/quotes", userController.getUserQuotes);
userRoutes.delete("/:uid", userController.deleteUserById);

export { userRoutes };
