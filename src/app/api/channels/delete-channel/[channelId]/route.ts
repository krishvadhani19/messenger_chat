import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getCurrentUserProfile } from "@/server/controllers/user";

export const DELETE = async (
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

    const deletedChannel = await db.channel.delete({
      where: {
        id: channelId,
      },
    });

    return NextResponse.json(deletedChannel);
  } catch (error) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
};
