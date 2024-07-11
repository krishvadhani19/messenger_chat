import { createNewServer } from "@/server/controllers/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { getCurrentUserProfile } from "@/server/controllers/user";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    /**
     * Getting current user if from session
     */
    const currentUserId = await getCurrentUserId();

    /**
     * If there is no session then return Unauthorized
     */
    if (!currentUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await getCurrentUserProfile(currentUserId);

    /**
     * If there is no profile then return internal error since session exists no able to retrieve the user
     */
    if (!profile) {
      return new NextResponse("Internal Error", { status: 500 });
    }

    const newServer = await createNewServer(
      profile?.id as string,
      name,
      imageUrl
    );

    return newServer;
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
