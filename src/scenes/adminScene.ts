import { Scenes } from "telegraf";
import { ADMIN_BUTTONS } from "../constants/buttons";
import { onCheckRequests } from "../handlers/admin/onCheckRequests";
import { onRequestApprove } from "../handlers/admin/onRequestApprove";
import { onRequestDecline } from "../handlers/admin/onRequestDecline";
import { sendKbMenu } from "../handlers/main/sendKbMenu";
import { kbAdmin } from "../keyboards/kbAdmin";
import { MyContext } from "../types";

const adminScene = new Scenes.BaseScene<MyContext>("admin");

adminScene.enter((ctx) => ctx.reply("Панель администратора", kbAdmin));

adminScene.hears(ADMIN_BUTTONS.BACK, (ctx) => ctx.scene.leave());

adminScene.hears(ADMIN_BUTTONS.CHECK_REQUESTS, onCheckRequests);

adminScene.action(/^request-approve-(\d+)$/, onRequestApprove);

adminScene.action(/^request-decline-(\d+)$/, onRequestDecline);

adminScene.leave(sendKbMenu);

export { adminScene };
