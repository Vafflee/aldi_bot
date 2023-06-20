import { MyContext } from "../../types";

export function onThankYou(ctx: MyContext) {
  if (ctx.isStaff) ctx.scene.enter("thankyou");
}
