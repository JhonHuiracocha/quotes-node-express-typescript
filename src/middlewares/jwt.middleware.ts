import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { HttpCode, HttpExecption } from "../exceptions";

export const validateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req
      .header("Authorization")
      ?.replace("Bearer ", "");

    if (!token) {
      throw new HttpExecption({
        statusCode: HttpCode.UNAUTHORIZED,
        errors: [
          {
            param: "token",
            msg: "No token provided.",
          },
        ],
      });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_JWT_SEED || "");

    if (!decoded) {
      throw new HttpExecption({
        statusCode: HttpCode.UNAUTHORIZED,
        errors: [
          {
            param: "token",
            msg: "Unauthorized!",
          },
        ],
      });
    }

    req.uid = decoded.uid;

    next();
  } catch (error) {
    throw new HttpExecption({
      statusCode: HttpCode.UNAUTHORIZED,
      errors: [
        {
          param: "token",
          msg: "Invalid token.",
        },
      ],
    });
  }
};
