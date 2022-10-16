import { NextFunction, Request, Response } from "express";
import { HttpExecption, HttpExceptionError, HttpCode } from "../exceptions";

export const errorHandler = (
  error: HttpExecption,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* Validation prisma exception pending */

  const defaultError: HttpExceptionError = {
    msg: "Internal server error.",
  };

  const status: number = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
  const errors: HttpExceptionError[] =
    status !== HttpCode.INTERNAL_SERVER_ERROR ? error.errors : [defaultError];

  res.status(status).json({
    statusCode: status,
    errors,
  });
};
