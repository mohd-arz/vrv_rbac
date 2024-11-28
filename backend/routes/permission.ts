import express from "express";
import {
  createPermission,
  createPermissionType,
  getPermissionTypes,
  getRoles,
  setRolePermission,
  getExistingPermissions,
} from "../controller/permission_controller";
import { auth, checkPermission } from "../middleware/auth";
const permissionRouter = express.Router();

permissionRouter.post(
  "/create-permission-type",
  auth,
  checkPermission("admin"),
  createPermissionType
);

permissionRouter.get(
  "/get-permission-types",
  auth,
  checkPermission("admin"),
  getPermissionTypes
);

permissionRouter.post(
  "/create-permission",
  auth,
  checkPermission("admin"),
  createPermission
);

permissionRouter.get("/get-roles", auth, checkPermission("admin"), getRoles);

permissionRouter.post(
  "/set-role-permission/:id",
  auth,
  checkPermission("admin"),
  setRolePermission
);

permissionRouter.get(
  "/get-existing-perms/:id",
  checkPermission("admin"),
  getExistingPermissions
);

export default permissionRouter;
