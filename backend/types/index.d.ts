import { User, Role } from "@prisma/client";
type UserWithRole = User & { role: Role };

declare global {
  namespace Express {
    interface Request {
      user?: UserWithRole;
    }
  }
}
