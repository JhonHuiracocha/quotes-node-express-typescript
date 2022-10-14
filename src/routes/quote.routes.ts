import { Router } from "express";
import { quoteController } from "../controllers";
import { quoteValidator } from "../validators";

const quoteRoutes = Router();

quoteRoutes.post(
  "/",
  quoteValidator.validateQuoteInput,
  quoteController.createQuote
);

quoteRoutes.get(
  "/:quoteId",
  quoteValidator.validateQuoteId,
  quoteController.getQuoteById
);

quoteRoutes.patch(
  "/:quoteId",
  quoteValidator.validateQuoteInput,
  quoteController.updateQuoteById
);

quoteRoutes.delete(
  "/:quoteId",
  quoteValidator.validateQuoteId,
  quoteController.deleteQuoteById
);

export { quoteRoutes };
