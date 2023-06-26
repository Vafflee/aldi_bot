import { User } from "@prisma/client";
import { Context, NarrowedContext, Scenes } from "telegraf";
import { CallbackQuery, Update } from "telegraf/typings/core/types/typegram";

// export type MyContext = Context &
//   SceneContext & {
//     user?: User;
//     isStaff?: boolean;
//     isAdmin?: boolean;
//   };

type MyWizardSession = Scenes.WizardSessionData;
interface MySession extends Scenes.WizardSession<MyWizardSession> {
  // will be available under `ctx.session.mySessionProp`
  // mySessionProp: number;
  sendThankYou: {
    recipientUsername: string;
    message: string;
  };
}
interface MySceneContextScene
  extends Scenes.SceneContextScene<MyContext, MyWizardSession> {
  state: {
    user?: User;
    // sendThankYouScene
    recipientId?: number;
    // thankYouScene
    thanksTotalCount?: number;
    totalPages?: number;
    // sendRequestScene
    fullName?: string;
    // addAdminScene
    newAdminId?: number;
  };
}
export interface MyContext extends Context {
  user?: User;
  isStaff?: boolean;
  isAdmin?: boolean;
  // declare session type
  session: MySession;
  // declare scene type
  scene: MySceneContextScene;
  // declare wizard type
  wizard: Scenes.WizardContextWizard<MyContext>;
}

export type MyContextWithMatch = NarrowedContext<
  MyContext & {
    match: RegExpExecArray;
  },
  Update.CallbackQueryUpdate<CallbackQuery>
>;

export type MyContextWithCallback = MyContext & {
  callbackQuery: {
    data: string;
  };
};

export type UserRole = "User" | "Staff" | "Admin";

export type NewUserInfo = {
  tgId: number;
  tgUsername: string;
  job?: string;
  role?: UserRole;
  fullName?: string;
};

export type NextFn = () => Promise<void>;

export type DiskItem = {
  name: string;
  sha256: string;
  path: string;
  file: string;
};
