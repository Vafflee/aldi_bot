import { ROLES } from "../constants/userRoles";
import { createUser, getUserByTgId } from "../db/user";
import { isStaffOrAdmin } from "../helpers/isStaffOrAdmin";
import { MyContext, NextFn } from "../types";

export async function setIsStaffAndIsAdmin(ctx: MyContext, next: NextFn) {
  if (!ctx.user) {
    ctx.isStaff = false;
    ctx.isAdmin = false;
  } else {
    ctx.isStaff = isStaffOrAdmin(ctx.user);
    ctx.isAdmin = ctx.user.role === ROLES.ADMIN;
  }
  await next();
}
