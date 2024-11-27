import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import prisma from "../db/prisma-singleton";
import { userRegister } from "@shared/schemas/user_schema";
import log from "../log/log";

export async function register(req: Request, res: Response) {
  try {
    const { name, username, password, confirm_password, role_id } = req.body;
    const validatedUser = userRegister.parse({
      username,
      name,
      password,
      confirm_password,
      role_id,
    });

    const isUserNameExist = await prisma.user.findUnique({
      where: { username: validatedUser.username },
    });

    if (isUserNameExist) {
      res
        .status(422)
        .json({ status: false, message: "Username Already Exist" });
    }
    const hashedPassword = bcrypt.hashSync(validatedUser.password, 10);
    await prisma.user.create({
      data: {
        username: validatedUser.username,
        name: validatedUser.name,
        password: hashedPassword,
        role_id: +validatedUser.role_id,
      },
    });
    res.json({ status: true, message: "User Added Successfully" });
  } catch (err: any) {
    log(err);
    res.status(422).json({ status: false, message: err });
  }
}

export async function me(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Something went wrong");
    }
    const responseUser = {
      name: user.name,
      username: user.username,
      role_id: user.role_id,
      role: user.role,
    };

    res.json({ user: responseUser });
  } catch (err) {
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          username: "admin",
        },
      },
      select: {
        name: true,
        username: true,
        role: true,
        created_at: true,
      },
    });
    res.json({ users });
  } catch (err) {
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}

export async function getRoles(req: Request, res: Response) {
  try {
    const roles = await prisma.role.findMany({
      where: {
        NOT: {
          name: "admin",
        },
      },
    });
    res.json({ roles });
  } catch (err) {
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}
