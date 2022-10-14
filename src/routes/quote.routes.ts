import { Router } from "express";
import { quoteController } from "../controllers";

const quoteRoutes = Router();

quoteRoutes.post("/", quoteController.createQuote);
quoteRoutes.get("/:quoteId", quoteController.getQuoteById);
quoteRoutes.patch("/:quoteId", quoteController.updateQuoteById);
quoteRoutes.delete("/:quoteId", quoteController.deleteQuoteById);

export { quoteRoutes };
