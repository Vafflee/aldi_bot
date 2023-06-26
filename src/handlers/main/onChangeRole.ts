import { MyContext } from "types";

export async function onChangeRole(ctx: MyContext) {
  if (ctx.isStaff) ctx.scene.enter("changerole");
}
