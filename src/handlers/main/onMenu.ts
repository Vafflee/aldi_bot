import { MyContext } from "../../types";
import { sendKbMenu } from "./sendKbMenu";

export function onMenu(ctx: MyContext) {
  if (ctx.scene.current) ctx.scene.leave();
  else sendKbMenu(ctx);
}
