import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import prisma from "../db/prisma-singleton";
import { userRegister } from "@shared/schemas/user_schema";
import log from "../log/log";

export async function createPermissionType(req: Request, res: Response) {
  try {
    const { type } = req.body;
    const isExist = await prisma.permissionType.findFirst({
      where: {
        type,
      },
    });
    if (isExist) {
      res.status(422).json({ status: false, message: "Type already exist" });
      return;
    }
    const permissionType = await prisma.permissionType.create({
      data: {
        type: type,
      },
    });
    res.json({
      status: true,
      message: "Permission Type added successfully",
    });
  } catch (err) {
    log(JSON.stringify(err));
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}

export async function getPermissionTypes(req: Request, res: Response) {
  try {
    const permissionTypes = await prisma.permissionType.findMany({
      include: {
        permissions: true,
      },
    });
    res.json({
      status: true,
      permissionTypes,
    });
  } catch (err) {
    log(JSON.stringify(err));
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}

export async function createPermission(req: Request, res: Response) {
  try {
    const { name, slug, type_id } = req.body;
    const typeExist = await prisma.permissionType.findFirst({
      where: {
        id: +type_id,
      },
    });

    if (!typeExist) {
      res
        .status(422)
        .json({ status: false, message: "Permission type doesnt exist" });
      return;
    }

    const permission = await prisma.permission.create({
      data: {
        name,
        slug,
        type_id: +type_id,
      },
    });

    res.json({ status: true, message: "Permission added successfully" });
  } catch (err) {
    log(JSON.stringify(err));
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
      include: {
        role_permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
    console.log(roles);
    res.json({ status: true, roles });
  } catch (err) {
    log(JSON.stringify(err));
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}

export async function setRolePermission(req: Request, res: Response) {
  try {
    const { permission }: { permission: number[] } = req.body;
    const { id } = req.params;
    prisma.$transaction(async (prisma) => {
      const oldDelete = await prisma.rolePermission.deleteMany({
        where: {
          role_id: +id,
        },
      });
      console.log("old", oldDelete);
      const rolePermissionsData = permission.map((permissionId) => ({
        role_id: +id,
        permission_id: permissionId,
      }));
      const newRolls = await prisma.rolePermission.createMany({
        data: rolePermissionsData,
      });
      console.log("new", newRolls);
    });
    res.json({ status: true, message: "Role Permission Added Successfully" });
  } catch (err) {
    log(JSON.stringify(err));
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}

export async function getExistingPermissions(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const roles = await prisma.rolePermission.findMany({
      where: {
        role_id: +id,
      },
    });
    const permissionIds = roles.map((perms) => {
      return perms.permission_id;
    });
    res.json({ status: true, permissionIds });
  } catch (err) {
    log(JSON.stringify(err));
    res.status(422).json({ status: false, message: "Something went wrong" });
  }
}
