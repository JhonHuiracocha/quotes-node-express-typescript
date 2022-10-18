import { Prisma, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpExecption } from "../exceptions";
import { bcryptHelper, jwtHelper } from "../helpers";
import { userService } from "../services";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const userFound: User | null = await userService.doesUserExist(email);

    if (!userFound) {
      throw new HttpExecption({
        statusCode: HttpCode.UNAUTHORIZED,
        errors: [
          {
            param: "email or password",
            msg: "The email or password is invalid.",
          },
        ],
      });
    }

    const comparePassword: boolean = await bcryptHelper.comparePassword(
      password,
      userFound.password
    );

    if (!comparePassword) {
      throw new HttpExecption({
        statusCode: HttpCode.UNAUTHORIZED,
        errors: [
          {
            param: "email or password",
            msg: "The email or password is invalid.",
          },
        ],
      });
    }

    const accessToken: string = jwtHelper.generateToken(userFound.id);

    return res.status(HttpCode.OK).json({
      message: "Successful login.",
      uid: userFound.id,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, imageUrl } = req.body;

    const encrytepPassword: string = await bcryptHelper.encryptPassword(
      password
    );

    const newUser: Prisma.UserCreateInput = {
      username,
      email,
      password: encrytepPassword,
      imageUrl,
    };

    const userFound: User | null = await userService.doesUserExist(email);

    if (userFound) {
      throw new HttpExecption({
        statusCode: HttpCode.CONFLICT,
        errors: [
          {
            param: "email",
            msg: "The user already exists.",
          },
        ],
      });
    }

    const createdUser: User = await userService.createUser(newUser);

    const accessToken: string = jwtHelper.generateToken(createdUser.id);

    return res.status(HttpCode.OK).json({
      message: "The user has been registered successfully.",
      uid: createdUser.id,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
