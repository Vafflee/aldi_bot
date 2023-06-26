import { Prisma, User } from "@prisma/client";
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

export async function getUserByTgId(tgId: number) {
  return await db.user.findUnique({
    where: {
      tgId,
    },
  });
}

export async function getUserByTgUsername(tgUsername: string) {
  return await db.user.findFirst({
    where: {
      tgUsername,
    },
  });
}

export async function getTopStaffByThanksCount() {
  return await db.user.findMany({
    include: {
      _count: {
        select: {
          recievedThanks: true,
        },
      },
    },
    where: {
      OR: [
        {
          role: ROLES.STAFF,
        },
        {
          role: ROLES.ADMIN,
        },
      ],
    },
    orderBy: {
      recievedThanks: {
        _count: "desc",
      },
    },
  });
}

export async function searchUsersByName(
  name: string
): Promise<(User & { sml: number })[]> {
  const sql = Prisma.sql`select u.*, sml from "User" u, similarity("fullName" , ${name}) as sml where (sml is not null and sml > 0 and role = 'STAFF') order by sml desc limit 3;`;
  return await db.$queryRaw(sql);
}

export async function createUser(userInfo: NewUserInfo) {
  return await db.user.create({
    data: {
      tgId: userInfo.tgId,
      tgUsername: userInfo.tgUsername,
      job: userInfo.job || undefined,
      role: userInfo.role || ROLES.USER,
      fullName: userInfo.fullName || undefined,
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
