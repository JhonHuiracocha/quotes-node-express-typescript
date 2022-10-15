import { Prisma, Quote, User } from "@prisma/client";
import { Request, Response } from "express";
import { quoteService, userService } from "../services";

export const createQuote = async (req: Request, res: Response) => {
  try {
    const { quote, authorId } = req.body;

    const userFound: User | null = await userService.getUserById(authorId);

    if (!userFound) {
      return res.status(404).json({
        message: "The user has not been found.",
      });
    }

    const newQuote: Prisma.QuoteCreateInput = {
      quote,
      author: {
        connect: {
          id: authorId,
        },
      },
    };

    const createdQuote: Quote = await quoteService.createQuote(newQuote);

    return res.status(201).json({
      message: "The quote has been created successfully.",
      data: createdQuote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const getQuoteById = async (req: Request, res: Response) => {
  try {
    const { quoteId } = req.params;

    const quoteFound: any | null = await quoteService.getQuoteById(
      parseInt(quoteId)
    );

    if (!quoteFound) {
      return res.status(404).json({
        message: "The quote has not been found.",
      });
    }

    return res.json({ data: quoteFound });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const updateQuoteById = async (req: Request, res: Response) => {
  try {
    const { quoteId } = req.params;
    const { quote } = req.body;

    const id: number = parseInt(quoteId);

    const newQuote: Prisma.QuoteUpdateInput = {
      quote,
    };

    const quoteFound: Quote | null = await quoteService.getQuoteById(id);

    if (!quoteFound) {
      return res.status(404).json({
        message: "The quote has not been found.",
      });
    }

    const updatedQuote: Quote = await quoteService.updateQuoteById(
      id,
      newQuote
    );

    return res.json({
      message: "The quote has been updated successfully.",
      data: updatedQuote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const deleteQuoteById = async (req: Request, res: Response) => {
  try {
    const { quoteId } = req.params;

    const id: number = parseInt(quoteId);

    const quoteFound: Quote | null = await quoteService.getQuoteById(id);

    if (!quoteFound) {
      return res.status(404).json({
        message: "The quote has not been found.",
      });
    }

    const deletedQuote = await quoteService.deleteQuoteById(id);

    return res.json({
      message: "The quote has been deleted successfully.",
      data: deletedQuote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
