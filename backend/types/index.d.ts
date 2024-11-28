import { User, Role, RolePermission, Permission } from "@prisma/client";
type UserWithRole = User & {
  role: Role & {
    role_permissions: (RolePermission & { permission: Permission })[];
  };
};

declare global {
  namespace Express {
    interface Request {
      user?: UserWithRole;
    }
  }
}
