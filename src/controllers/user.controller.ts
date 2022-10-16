import { Prisma, Quote, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpExecption } from "../exceptions";
import { bcryptHelper } from "../helpers";
import { userService } from "../services";

export const createUser = async (
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

    return res.status(HttpCode.CREATED).json({
      message: "The user has been created successfully.",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserQuotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.params;

    const id: number = parseInt(uid);

    const quotes: Quote[] = await userService.getUserQuotes(id);

    return res.status(HttpCode.OK).json({
      data: quotes,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.params;

    const id: number = parseInt(uid);

    const userFound: User | null = await userService.getUserById(id);

    if (!userFound) {
      throw new HttpExecption({
        statusCode: HttpCode.NOT_FOUND,
        errors: [
          {
            param: "uid",
            msg: "The user has not been found.",
          },
        ],
      });
    }

    return res.status(HttpCode.OK).json({
      data: userFound,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.params;

    const id: number = parseInt(uid);

    const userFound: User | null = await userService.getUserById(id);

    if (!userFound) {
      throw new HttpExecption({
        statusCode: HttpCode.NOT_FOUND,
        errors: [
          {
            param: "uid",
            msg: "The user has not been found.",
          },
        ],
      });
    }

    const deletedUser: User = await userService.deleteUserById(id);

    return res.status(HttpCode.OK).json({
      message: "The user has been deleted successfully.",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
