"use server";

import { signOut } from "@/auth";
import { LOGIN_PAGE } from "@/routes";

export const logout = async () => {
  await signOut({ redirectTo: LOGIN_PAGE });
};
