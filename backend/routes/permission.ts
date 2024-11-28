import express from "express";
import {
  createPermission,
  createPermissionType,
  getPermissionTypes,
  getRoles,
  setRolePermission,
  getExistingPermissions
} from "../controller/permission_controller";
import { auth } from "../middleware/auth";
const permissionRouter = express.Router();

permissionRouter.post("/create-permission-type", auth, createPermissionType);

permissionRouter.get("/get-permission-types", auth, getPermissionTypes);

permissionRouter.post("/create-permission",auth,createPermission);

permissionRouter.get("/get-roles",auth,getRoles);

permissionRouter.post("/set-role-permission/:id",auth,setRolePermission);

permissionRouter.get("/get-existing-perms/:id",getExistingPermissions);

export default permissionRouter;
