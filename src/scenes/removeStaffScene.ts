import { Markup, Scenes } from "telegraf";
import { COMMON_BUTTONS } from "../constants/buttons";
import { ROLES } from "../constants/userRoles";
import { updateUser } from "../db/user";
import { onMenu } from "../handlers/main/onMenu";
import { findUser } from "../helpers/findUser";
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
  if (ctx.message && "text" in ctx.message) {
    if (
      ctx.message.text === COMMON_BUTTONS.CANCEL ||
      ctx.message.text === "/menu"
    ) {
      return endScene(ctx);
    }
  }
  const user = await findUser(ctx, (err) => {
    ctx.reply(err);
  });
  if (!user) return;

  const updatedUser = await updateUser({
    ...user,
    role: ROLES.USER,
    job: null,
  });
  if (!updatedUser) throw new Error("Attempt to update user failed");

  ctx.reply("Пользователь успешно удален из списка сотрудников");
  endScene(ctx);
};

const removeStaffScene = new Scenes.WizardScene<MyContext>(
  "removestaff",
  inputUserHandler
);

removeStaffScene.hears(COMMON_BUTTONS.CANCEL, (ctx) => {
  endScene(ctx);
});

removeStaffScene.enter((ctx) =>
  ctx.reply(
    'Напишите частично или полностью имя сотрудника или выберите через кнопку "Выбрать" пользователя, у которого требуется забрать доступ к функциям для сотрудников?',
    Markup.keyboard([
      Markup.button.userRequest(COMMON_BUTTONS.CHOOSE_USER, 1),
      COMMON_BUTTONS.CANCEL,
    ]).resize()
  )
);

export { removeStaffScene };
