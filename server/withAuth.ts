"use server";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { Profile } from "@prisma/client";

type APIHandler = (
  req: Request,
  params: { [key: string]: string | string[] },
  userProfile: Profile,
  userId: string
) => Promise<NextResponse>;

export const withAuth = (handler: APIHandler) => {
  return async (
    req: Request,
    { params }: { params: { [key: string]: string | string[] } }
  ) => {
    try {
      const session = await auth();
      const userId = session?.user?.id;

      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const profile = await getCurrentUserProfile(userId);

      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      await handler(req, params, profile, userId);
    } catch (error) {
      console.log({ error });
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
};
