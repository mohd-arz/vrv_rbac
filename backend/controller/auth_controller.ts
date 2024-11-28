import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userLogin } from "@shared/schemas/user_schema";
import prisma from "../db/prisma-singleton";
import log from "../log/log";

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const validatedUser = userLogin.parse({ username, password });
    const user = await prisma.user.findUnique({
      where: {
        username: validatedUser.username,
      },
      include: {
        role: {
          include: {
            role_permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      res.status(422).json({ status: false, message: "User doesn't exist" });
      return;
    }
    const compare = bcrypt.compareSync(validatedUser.password, user.password);
    if (!compare) {
      res
        .status(422)
        .json({ status: false, message: "Credential's doesn't match" });
      return;
    }

    const secret = process.env.JWT_SECRET ?? "12345";
    const token = jwt.sign({ user_id: user.id }, secret);

    const responseUser = {
      name: user.name,
      username: user.username,
      role_id: user.role_id,
      role: user.role,
    };

    res.cookie("auth_token", token, {
      maxAge: 3 * 60 * 60 * 1000,
      // httpOnly: true,  // commented so that postman can have cookie
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      status: true,
      message: "Login successfully",
      user: responseUser,
    });
  } catch (err: any) {
    log(JSON.stringify(err.issues));
    res.status(422).json({ status: false, message: err.issues });
  }
}
