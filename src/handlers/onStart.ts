import { kbMenu } from "../keyboards/kbMenu";
import { MyContext } from "../types";

export async function onStart(ctx: MyContext) {
  await ctx.reply("Start message 1", kbMenu(ctx));
}
