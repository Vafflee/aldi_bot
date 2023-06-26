import { sendKbMenu } from "../../services/sendKbMenu";
import { MyContext } from "../../types";

export function onMenu(ctx: MyContext) {
  if (ctx.scene.current) ctx.scene.leave();
  sendKbMenu(ctx);
}
