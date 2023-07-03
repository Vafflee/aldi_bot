import { createDiskPaths, getDiskPathByPath } from "../db/diskPath";
import { DiskItem } from "../types";

export async function cachePaths(items: DiskItem[]) {
  try {
    const paths = items.map((item) => ({
      path: item.path,
    }));
    const uncachedPaths = [];
    for (const path of paths) {
      if (!(await getDiskPathByPath(path.path))) uncachedPaths.push(path);
    }
    if (uncachedPaths.length > 0) await createDiskPaths(uncachedPaths);
  } catch (err) {
    console.error(err);
  }
}
