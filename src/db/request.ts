import { Request } from "@prisma/client";
import { UserRole } from "../types";
import { db } from "./db";

export async function getRequests() {
  return await db.request.findMany({
    include: {
      user: true,
    },
  });
}

export async function getRequest(requestId: number) {
  return await db.request.findUnique({
    where: {
      id: requestId,
    },
    include: {
      user: true,
    },
  });
}

export async function getRequestByUserId(userId: number) {
  return await db.request.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
    include: {
      user: true,
    },
  });
}

export async function createRequest(userId: number, requestedRole: UserRole) {
  return await db.request.create({
    data: {
      userId: userId,
      role: requestedRole,
    },
  });
}

export async function updateRequest(request: Request) {
  return await db.request.update({
    where: {
      id: request.id,
    },
    data: request,
  });
}

export async function deleteRequest(requestId: number) {
  return await db.request.delete({
    where: {
      id: requestId,
    },
  });
}
