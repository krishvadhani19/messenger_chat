"use server";

import { auth } from "@/auth";

export const getCurrentUserId = async () => {
  const session = await auth();

  return session?.user?.id;
};
