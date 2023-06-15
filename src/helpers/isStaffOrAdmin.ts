import { User } from "@prisma/client";
import { ROLES } from "../constants/userRoles";

export function isStaffOrAdmin(user?: User) {
  if (!user) return false;
  return user.role === ROLES.STAFF || user.role === ROLES.ADMIN;
}
