import express from "express";
import { createProduct, getProducts } from "../controller/product_controller";
import { auth, checkPermission } from "../middleware/auth";

const productRouter = express.Router();

productRouter.post(
  "/create",
  auth,
  checkPermission("create-products"),
  createProduct
);

productRouter.get("/", auth, checkPermission("listing-products"), getProducts);

export default productRouter;
