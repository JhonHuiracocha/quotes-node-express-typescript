import { Router } from "express";
import { quoteController } from "../controllers";
import { validateToken } from "../middlewares";
import { quoteValidator } from "../validators";

const quoteRoutes = Router();

quoteRoutes.post(
  "/",
  validateToken,
  quoteValidator.validateCreateQuote,
  quoteController.createQuote
);

quoteRoutes.get(
  "/:quoteId",
  quoteValidator.validateQuoteId,
  quoteController.getQuoteById
);

quoteRoutes.patch(
  "/:quoteId",
  validateToken,
  quoteValidator.validateUpdateQuote,
  quoteController.updateQuoteById
);

quoteRoutes.delete(
  "/:quoteId",
  validateToken,
  quoteValidator.validateQuoteId,
  quoteController.deleteQuoteById
);

export { quoteRoutes };
