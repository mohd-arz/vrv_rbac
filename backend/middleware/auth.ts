import type { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError, type JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma-singleton";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { auth_token } = req.cookies;
    if (!auth_token) {
      res.status(403).json({ status: false, message: "Token is not provided" });
      return;
    }

    const secret = process.env.JWT_SECRET ?? "12345";

    let verified: JwtPayload;

    try {
      verified = jwt.verify(auth_token, secret) as JwtPayload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).json({ status: false, message: "Token expired" });
        return;
      }
      res.status(403).json({ status: false, message: "Invalid token" });
      return;
    }

    if (verified && verified.user_id) {
      const user = await prisma.user.findUnique({
        where: {
          id: verified.user_id,
        },
        include: {
          role: true,
        },
      });

      if (!user) {
        res.status(403).json({ status: false, message: "Forbidden" });
        return;
      }
      req.user = user;
      next();
      return;
    }
    res.status(401).json({ status: false, message: "Unauthorized" });
  } catch (err) {
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}
