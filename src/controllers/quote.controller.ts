import { Prisma, Quote, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpExecption } from "../exceptions";
import { quoteService, userService } from "../services";

export const createQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quote, authorId } = req.body;

    const userFound: User | null = await userService.getUserById(authorId);

    if (!userFound) {
      throw new HttpExecption({
        statusCode: HttpCode.NOT_FOUND,
        errors: [
          {
            param: "authorId",
            msg: "The user has not been found.",
          },
        ],
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

    return res.status(HttpCode.CREATED).json({
      message: "The quote has been created successfully.",
      data: createdQuote,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quoteId } = req.params;

    const quoteFound: any | null = await quoteService.getQuoteById(
      parseInt(quoteId)
    );

    if (!quoteFound) {
      throw new HttpExecption({
        statusCode: HttpCode.NOT_FOUND,
        errors: [
          {
            param: "quoteId",
            msg: "The quote has not been found.",
          },
        ],
      });
    }

    return res.status(HttpCode.OK).json({ data: quoteFound });
  } catch (error) {
    next(error);
  }
};

export const updateQuoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quoteId } = req.params;
    const { quote } = req.body;

    const id: number = parseInt(quoteId);

    const newQuote: Prisma.QuoteUpdateInput = {
      quote,
    };

    const quoteFound: Quote | null = await quoteService.getQuoteById(id);

    if (!quoteFound) {
      throw new HttpExecption({
        statusCode: HttpCode.NOT_FOUND,
        errors: [
          {
            param: "quoteId",
            msg: "The quote has not been found.",
          },
        ],
      });
    }

    const updatedQuote: Quote = await quoteService.updateQuoteById(
      id,
      newQuote
    );

    return res.status(HttpCode.OK).json({
      message: "The quote has been updated successfully.",
      data: updatedQuote,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quoteId } = req.params;

    const id: number = parseInt(quoteId);

    const quoteFound: Quote | null = await quoteService.getQuoteById(id);

    if (!quoteFound) {
      throw new HttpExecption({
        statusCode: HttpCode.NOT_FOUND,
        errors: [
          {
            param: "quoteId",
            msg: "The quote has not been found.",
          },
        ],
      });
    }

    const deletedQuote = await quoteService.deleteQuoteById(id);

    return res.status(HttpCode.OK).json({
      message: "The quote has been deleted successfully.",
      data: deletedQuote,
    });
  } catch (error) {
    next(error);
  }
};
