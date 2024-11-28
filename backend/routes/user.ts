import express from "express";
import {
  getRoles,
  getUsers,
  me,
  register,
} from "../controller/user_controller";
import { auth, checkPermission } from "../middleware/auth";
import { login } from "../controller/auth_controller";

const userRouter = express.Router();

userRouter.post("/login", login);

userRouter.post("/register", auth, checkPermission("create-users"), register);

userRouter.get("/get-users", auth, checkPermission("listing-users"), getUsers);

userRouter.get("/me", auth, me);

userRouter.get("/get-roles", getRoles);

export default userRouter;
