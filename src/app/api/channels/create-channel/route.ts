import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getCurrentUserProfile } from "@/server/controllers/user";

const handler = async (req: Request) => {
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
    const { chanelName, chanelType, serverId } = await req.json();

    if (!serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    if (!chanelName || !chanelType) {
      return new NextResponse("Missing details required to make chanel", {
        status: 400,
      });
    }

    const newChanel = await db.chanel.create({
      data: {
        name: chanelName,
        serverId,
        profileId: profile?.id,
        chanelType,
      },
    });

    return NextResponse.json(newChanel);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = handler;
