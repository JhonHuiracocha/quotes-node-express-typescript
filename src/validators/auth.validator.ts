import { check } from "express-validator";
import { validateRequestSchema } from "../middlewares";

export const validateUserLogin = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("The email cannot be empty")
    .isEmail()
    .withMessage("Must be a email"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("The password cannot be empty")
    .isLength({ max: 255 })
    .withMessage("The password must have a maximum of 255 characters"),
  validateRequestSchema,
];
