import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { memberId: string; serverId: string } }
) => {
  try {
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
     * If there is no profile then return Unauthorized
     */
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { memberId, serverId } = params;

    if (!memberId || !serverId) {
      return new NextResponse("Required ID missing", { status: 400 });
    }

    await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: crypto.randomUUID(),
      },
    });

    const deletedMember = await db.member.delete({
      where: {
        id: memberId,
      },
    });

    return NextResponse.json(deletedMember);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};
