import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getCurrentUserProfile } from "@/server/controllers/user";

export const PATCH = async (
  req: Request,
  { params }: { params: { channelId: string } }
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
    const { channelId } = params;

    if (!channelId) {
      return new NextResponse("Channel ID is missing", { status: 400 });
    }

    const { channelName, channelType } = await req.json();

    if (!channelName || !channelType) {
      return new NextResponse("Channel Details missing", { status: 400 });
    }

    const updatedChannel = await db.channel.update({
      where: {
        id: channelId,
      },
      data: {
        name: channelName,
        channelType,
      },
    });

    return NextResponse.json(updatedChannel);
  } catch (error) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
};
