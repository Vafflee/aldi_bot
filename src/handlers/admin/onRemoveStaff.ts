import { MyContext } from "types";

export async function onRemoveStaff(ctx: MyContext) {
  if (ctx.isAdmin) ctx.scene.enter("removestaff");
}
