import { User } from "@prisma/client";
import { Context, Scenes } from "telegraf";

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

export type UserRole = "User" | "Staff" | "Admin";

export type NewUserInfo = {
  tgId: number;
  tgUsername: string;
  job?: string;
  role?: UserRole;
  fullName?: string;
};

export type NextFn = () => Promise<void>;
