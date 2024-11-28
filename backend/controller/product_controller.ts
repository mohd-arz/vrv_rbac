import type { Request, Response } from "express";
import log from "../log/log";
import prisma from "../db/prisma-singleton";
import { productCreate } from "@shared/schemas/product_schema";

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, description, status } = req.body;
    const { user } = req;
    if (!user) {
      res.json(403).json({ status: false, message: "Forbidden" });
      return;
    }
    const validatedProduct = productCreate.parse({ name, description, status });
    const product = await prisma.product.create({
      data: {
        name: validatedProduct.name,
        description: validatedProduct.description,
        status: validatedProduct.status,
        created_by: user.id,
      },
    });
    res.json({ status: true, message: "Product Added Successfully" });
  } catch (err: any) {
    log(JSON.stringify(err.issues));
    res.status(422).json({ status: false, message: err.issues });
  }
}
export async function getProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json({ status: true, products });
  } catch (err: any) {
    log(JSON.stringify(err.issues));
    res.status(422).json({ status: false, message: err.issues });
  }
}
