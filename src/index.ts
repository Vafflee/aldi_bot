import { config } from "dotenv";
import { Client } from "@notionhq/client";

config();

import { Telegraf } from 'telegraf';
import { onStart } from "./handlers/onStart";
import { onHelp } from "./handlers/onHelp";

const tgToken = process.env.TG_TOKEN;
const ntToken = process.env.NT_TOKEN;
if (!tgToken) throw new Error('No TG_TOKEN');
if (!ntToken) throw new Error('No NT_TOKEN');

const notion = new Client({
  auth: ntToken,
})

const bot = new Telegraf(tgToken);

bot.start(onStart);
bot.help(onHelp);
// bot.hears('nttest', async (ctx) => {
  
// });

bot.launch();

(async () => {
  const page = await notion.pages.retrieve({page_id: "df6eb86ee23b4ffc85a001be1842ed17" });
  const block = await notion.blocks.retrieve({ block_id: "7e89440e969e488395795396067452d7"});
  console.log(block.object);
  // console.log(await notion.databases.retrieve({database_id: "509c826cd27f4ba4bf5570f11683e914" }))
})()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));