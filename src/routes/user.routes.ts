import { Router } from "express";
import { userController } from "../controllers";

const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.get("/:uid/quotes", userController.getUserQuotes);

export { userRoutes };
