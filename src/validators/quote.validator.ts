import { check } from "express-validator";
import { validateRequestSchema } from "../middlewares";

export const validateCreateQuote = [
  check("quote")
    .not()
    .isEmpty()
    .withMessage("The quote cannot be empty")
    .isLength({ max: 150 })
    .withMessage("The quote must have a maximum of 150 characters"),
  check("authorId")
    .not()
    .isEmpty()
    .withMessage("The quote must include the author id")
    .isNumeric()
    .withMessage("The author id must be a number"),
  validateRequestSchema,
];

export const validateUpdateQuote = [
  check("quote")
    .not()
    .isEmpty()
    .withMessage("The quote cannot be empty")
    .isLength({ max: 150 })
    .withMessage("The quote must have a maximum of 150 characters"),
  validateRequestSchema,
];

export const validateQuoteId = [
  check("quoteId").isNumeric().withMessage("The author id must be a number"),
  validateRequestSchema,
];
