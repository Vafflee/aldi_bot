import { User } from "@prisma/client";
import { ROLES } from "../constants/userRoles";
import { NewUserInfo } from "../types";
import { db } from "./db";

export async function getUser(userId: number) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUserByTgId(tgId: string) {
  return await db.user.findUnique({
    where: {
      tgId,
    },
  });
}

export async function createUser(userInfo: NewUserInfo) {
  return await db.user.create({
    data: {
      tgId: userInfo.tgId,
      job: userInfo.job || undefined,
      role: userInfo.role || ROLES.USER,
    },
  });
}

export async function updateUser(user: User) {
  return await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
}
