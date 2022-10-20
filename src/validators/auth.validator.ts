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
    .isLength({ max: 20 })
    .withMessage("The password must have a maximum of 20 characters"),
  validateRequestSchema,
];

export const validateUserRegister = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("The username cannot be empty")
    .isLength({ max: 45 })
    .withMessage("The username must have a maximum of 45 characters"),
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
    .isLength({ max: 20 })
    .withMessage("The password must have a maximum of 20 characters"),
  validateRequestSchema,
];
