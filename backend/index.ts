import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import cookieParser from "cookie-parser";
import cors from "cors";
import log from "./log/log";
dotenv.config();

const port = process.env.NODE_PORT;

const app: Express = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/user", userRoutes);

app.use((err: any, req: Request, res: Response, next: any) => {
  log(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log("App is listening on PORT", port);
});
