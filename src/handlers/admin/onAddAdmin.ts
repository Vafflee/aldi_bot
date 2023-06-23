import { MyContext } from "types";

export async function onAddAdmin(ctx: MyContext) {
  if (ctx.isAdmin) ctx.scene.enter("addadmin");
}
