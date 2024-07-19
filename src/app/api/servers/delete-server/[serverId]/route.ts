import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { serverId: string } }
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

    const { serverId } = params;

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const deletedServer = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(deletedServer);
  } catch (error) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
};
