import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import cookieParser from "cookie-parser";
import cors from "cors";
import log from "./log/log";
import permissionRouter from "./routes/permission";
import productRouter from "./routes/product";
import path from "path";

dotenv.config();

const port = process.env.NODE_PORT;

const app: Express = express();

app.use(cookieParser());
app.use(
  cors()
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/permission", permissionRouter);
app.use("/api/v1/product", productRouter);

const buildPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use((err: any, req: Request, res: Response, next: any) => {
  log(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log("App is listening on PORT", port);
});
