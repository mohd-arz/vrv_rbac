import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkPermission(user: any, perms: any, perm: any) {
  if (perm == "admin") {
    if (user.role_id == 1) return true;
    else return false;
  }
  if (user.role_id == 1) {
    return true;
  }
  if (perm == "" || perms.includes(perm)) {
    return true;
  }
  return false;
}
