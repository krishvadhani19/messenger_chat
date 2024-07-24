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
    const { channelName, channelType, serverId } = await req.json();

    if (!serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    if (!channelName || !channelType) {
      return new NextResponse("Missing details required to make channel", {
        status: 400,
      });
    }

    const newChannel = await db.channel.create({
      data: {
        name: channelName,
        serverId,
        profileId: profile?.id,
        channelType,
      },
    });

    return NextResponse.json(newChannel);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = handler;
