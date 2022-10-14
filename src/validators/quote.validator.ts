import { check } from "express-validator";
import { validateRequestSchema } from "../middlewares";

export const validateQuoteInput = [
  check("quote").not().isEmpty().withMessage("The quote cannot be empty"),
  check("authorId")
    .not()
    .isEmpty()
    .withMessage("The quote must include the author id")
    .isNumeric()
    .withMessage("The author id must be a number"),
  validateRequestSchema,
];

export const validateQuoteId = [
  check("quoteId").isNumeric().withMessage("The author id must be a number"),
  validateRequestSchema,
];
