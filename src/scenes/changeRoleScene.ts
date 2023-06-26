import { Markup, Scenes } from "telegraf";
import { CHANGEROLE_BUTTONS, COMMON_BUTTONS } from "../constants/buttons";
import { ROLES_MAP } from "../constants/rolesMap";
import { ROLES } from "../constants/userRoles";
import { updateUser } from "../db/user";
import { onMenu } from "../handlers/main/onMenu";
import { MyContext } from "../types";

export const changeRoleScene = new Scenes.BaseScene<MyContext>("changerole");

const endScene = async (ctx: MyContext) => {
  await ctx.scene.leave();
  onMenu(ctx);
};

changeRoleScene.hears([COMMON_BUTTONS.CANCEL, "/menu"], endScene);

changeRoleScene.hears(CHANGEROLE_BUTTONS.USER, async (ctx) => {
  try {
    const updatedUser = await updateUser({
      ...ctx.user,
      role: ROLES.USER,
      job: null,
    });
    if (!updatedUser) throw new Error("Failed to update user");
    ctx.isAdmin = false;
    ctx.isStaff = false;
    await ctx.reply(
      `Ваша роль успешно изменена, теперь вы "${ROLES_MAP[updatedUser.role]}"`
    );
  } catch (err) {
    console.error(err);
  }
  endScene(ctx);
});

changeRoleScene.hears(CHANGEROLE_BUTTONS.STAFF, async (ctx) => {
  try {
    const updatedUser = await updateUser({
      ...ctx.user,
      role: ROLES.STAFF,
    });
    if (!updatedUser) throw new Error("Failed to update user");
    ctx.isAdmin = false;
    console.log(ctx);
    await ctx.reply(
      `Ваша роль успешно изменена, теперь вы "${ROLES_MAP[updatedUser.role]}"`
    );
  } catch (err) {
    console.error(err);
  }
  endScene(ctx);
});

changeRoleScene.enter((ctx) => {
  ctx.reply(
    "Выберите новую роль",
    Markup.keyboard([
      [
        CHANGEROLE_BUTTONS.USER,
        Markup.button.text(
          CHANGEROLE_BUTTONS.STAFF,
          ctx.user.role === ROLES.STAFF
        ),
      ],
      [COMMON_BUTTONS.CANCEL],
    ]).resize()
  );
});
