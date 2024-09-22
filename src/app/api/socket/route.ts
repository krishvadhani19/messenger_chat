import { auth } from "@/auth";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const profile = await getCurrentUserProfile(userId);

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { channelId, memberId, serverId } = await req.json();

  if (!channelId || !memberId || !serverId) {
    return new NextResponse(
      "Missing details required to authenticate the socket connection request",
      {
        status: 400,
      }
    );
  }
};

export const POST = handler;
