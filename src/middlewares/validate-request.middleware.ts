import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpCode, HttpExecption } from "../exceptions";

export const validateRequestSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpExecption({
      statusCode: HttpCode.BAD_REQUEST,
      errors: errors.array(),
    });
  }

  next();
};
