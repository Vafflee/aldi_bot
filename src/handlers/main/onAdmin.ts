import { MyContext } from "../../types";

export function onAdmin(ctx: MyContext) {
  if (ctx.isAdmin) ctx.scene.enter("admin");
}
