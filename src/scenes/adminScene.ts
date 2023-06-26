import { Scenes } from "telegraf";
import { ADMIN_BUTTONS } from "../constants/buttons";
import { onAddAdmin } from "../handlers/admin/onAddAdmin";
import { onCheckRequests } from "../handlers/admin/onCheckRequests";
import { onRemoveStaff } from "../handlers/admin/onRemoveStaff";
import { onRequestApprove } from "../handlers/admin/onRequestApprove";
import { onRequestDecline } from "../handlers/admin/onRequestDecline";
import { onMenu } from "../handlers/main/onMenu";
import { kbAdmin } from "../keyboards/kbAdmin";
import { MyContext } from "../types";

const adminScene = new Scenes.BaseScene<MyContext>("admin");

adminScene.enter((ctx) => ctx.reply("Панель администратора", kbAdmin));

adminScene.hears([ADMIN_BUTTONS.BACK, "/menu"], onMenu);

adminScene.hears(ADMIN_BUTTONS.CHECK_REQUESTS, onCheckRequests);

adminScene.hears(ADMIN_BUTTONS.ADD_ADMIN, onAddAdmin);

adminScene.hears(ADMIN_BUTTONS.REMOVE_STAFF, onRemoveStaff);

adminScene.action(/^request-approve-(\d+)$/, onRequestApprove);

adminScene.action(/^request-decline-(\d+)$/, onRequestDecline);

export { adminScene };
