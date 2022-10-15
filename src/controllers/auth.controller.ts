import { User } from "@prisma/client";
import { Request, Response } from "express";
import { bcryptHelper } from "../helpers";
import { userService } from "../services";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userFound: User | null = await userService.doesUserExist(email);

    if (!userFound) {
      return res.status(401).json({
        message: "The email or password is invalid.",
      });
    }

    const comparePassword: boolean = await bcryptHelper.comparePassword(
      password,
      userFound.password
    );

    if (!comparePassword) {
      return res.status(401).json({
        message: "The email or password is invalid.",
      });
    }

    return res.json({
      message: "Successful login.",
      accessToken: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
