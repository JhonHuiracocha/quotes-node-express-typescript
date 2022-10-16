import { NextFunction, Response } from "express";
import { HttpCode, HttpExecption } from "../exceptions";
import { jwtHelper } from "../helpers";

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

    const decoded = jwtHelper.verifyToken(
      token,
      process.env.SECRET_JWT_SEED || "secret"
    );

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
