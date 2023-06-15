import { kbMenu } from "../keyboards/kbMenu";
import { MyContext } from "../types";

export async function onStart(ctx: MyContext) {
  await ctx.reply("Start message 1", kbMenu(ctx));
  // await ctx.reply('Start message 2');
  // await ctx.reply('Start message 3');
  // await ctx.reply('Start message 4');
  // await ctx.reply('Start message 5');
}
