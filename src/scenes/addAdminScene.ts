import { Markup, Scenes } from "telegraf";
import { COMMON_BUTTONS } from "../constants/buttons";
import { ROLES } from "../constants/userRoles";
import { getUser, getUserByTgId, updateUser } from "../db/user";
import { onMenu } from "../handlers/main/onMenu";
import { MyContext } from "../types";

function endScene(ctx: MyContext) {
  if (ctx.isAdmin) ctx.scene.enter("admin");
  else onMenu(ctx);
}

const inputUserHandler = async (
  ctx: MyContext & {
    callbackQuery: {
      data: string;
    };
  }
) => {
  if ("text" in ctx.message) {
    if (
      ctx.message.text === COMMON_BUTTONS.CANCEL ||
      ctx.message.text === "/menu"
    ) {
      endScene(ctx);
    }
  }
  if ("user_shared" in ctx.message) {
    const tgUser = ctx.message.user_shared;
    const user = await getUserByTgId(tgUser.user_id);

    if (!user)
      return ctx.reply(
        "Этот пользователь еще не взаимодействовал с ботом, так что сделать его администратором нельзя"
      );
    if (user.id === ctx.user.id) return ctx.reply("Вы уже администратор");
    if (user.role === ROLES.ADMIN)
      return ctx.reply("Пользователь уже администратор");
    ctx.scene.state = {
      newAdminId: user.id,
    };

    const userLink = user.tgUsername
      ? `@${user.tgUsername}`
      : `<a href="tg://user?id=${user.tgId}">@${user.tgId}</a>`;

    await ctx.reply(
      `Вы уверенны, что хотите сделать пользователя ${userLink} администратором? Он сможет добавлять новых сотрудников и администраторов.`,
      Markup.keyboard([COMMON_BUTTONS.YES, COMMON_BUTTONS.CANCEL]).resize()
    );
    return ctx.wizard.next();
  }
};

const confirmUser = async (ctx: MyContext) => {
  if ("text" in ctx.message) {
    if (
      ctx.message.text === COMMON_BUTTONS.CANCEL ||
      ctx.message.text === "/menu"
    ) {
      endScene(ctx);
    } else if (ctx.message.text === COMMON_BUTTONS.YES) {
      try {
        const user = await getUser(ctx.scene.state.newAdminId);
        const updatedUser = await updateUser({ ...user, role: ROLES.ADMIN });
        if (!updatedUser) throw new Error("Attempt to update user failed");
        await ctx.reply(
          "Пользователь успешно добавлен в группу администраторов"
        );
      } catch (err) {
        console.error(err);
      }
      endScene(ctx);
    }
  }
};

const addAdminScene = new Scenes.WizardScene<MyContext>(
  "addadmin",
  inputUserHandler,
  confirmUser
);

addAdminScene.hears(COMMON_BUTTONS.CANCEL, (ctx) => {
  endScene(ctx);
});

addAdminScene.enter((ctx) =>
  ctx.reply(
    "Вы хотите добавить нового администратора в систему?",
    Markup.keyboard([
      Markup.button.userRequest("➕ Добавить", 2),
      COMMON_BUTTONS.CANCEL,
    ]).resize()
  )
);

export { addAdminScene };
