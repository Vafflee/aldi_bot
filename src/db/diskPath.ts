import { db } from "./db";

export async function getDiskPathByPath(path: string) {
  return await db.diskPath.findUnique({
    where: {
      path,
    },
  });
}

export async function getDiskPath(id: number) {
  return await db.diskPath.findUnique({
    where: {
      id,
    },
  });
}

export async function createDiskPaths(dickPathsData: { path: string }[]) {
  return await db.diskPath.createMany({
    data: dickPathsData,
  });
}
