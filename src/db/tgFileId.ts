import { TgFileId } from "@prisma/client";
import { db } from "./db";

export async function getFileId(sha256: string) {
  return await db.tgFileId.findUnique({
    where: {
      sha256,
    },
  });
}

export async function createFileId(fileIdsData: TgFileId[]) {
  return await db.tgFileId.createMany({
    data: fileIdsData,
  });
}
