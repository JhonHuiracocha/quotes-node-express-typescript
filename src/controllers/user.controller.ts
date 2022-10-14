import { Prisma, Quote, User } from "@prisma/client";
import { Request, Response } from "express";
import { bcryptHelper } from "../helpers";
import { userService } from "../services";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, imageUrl } = req.body;

    const encrytepPassword = await bcryptHelper.encryptPassword(password);

    const newUser: Prisma.UserCreateInput = {
      username,
      email,
      password: encrytepPassword,
      imageUrl,
    };

    const userFound: User | null = await userService.doesUserExist(email);

    if (userFound) {
      return res.status(409).json({
        message: "The user already exists.",
      });
    }

    const createdUser: User = await userService.createUser(newUser);

    return res.status(201).json({
      message: "The user has been created successfully.",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const getUserQuotes = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    const id = parseInt(uid);

    const quotes: Quote[] = await userService.getUserQuotes(id);

    return res.json({
      data: quotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
