import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { serverId: string };
  }
) {
  try {
    const currentUserId = await getCurrentUserId();
    const profile = await getCurrentUserProfile(currentUserId!);

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = params.serverId;

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 401 });
    }

    const updatedServer = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: crypto.randomUUID(),
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
