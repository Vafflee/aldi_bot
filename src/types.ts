import { User } from "@prisma/client";
import { Context } from "telegraf";
import { SceneContext } from "telegraf/typings/scenes";

export type MyContext = Context &
  SceneContext & {
    user?: User;
    isStaff?: boolean;
    isAdmin?: boolean;
  };

export type UserRole = "User" | "Staff" | "Admin";

export type NewUserInfo = {
  tgId: string;
  job?: string;
  role?: UserRole;
};

export type NextFn = () => Promise<void>;
