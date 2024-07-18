import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
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

    const { memberId } = params;

    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const { role: newRole } = await req.json();

    if (!newRole) {
      return new NextResponse("Role is missing", { status: 400 });
    }

    const updatedMember = await db.member.update({
      where: {
        id: memberId,
      },
      data: {
        role: newRole,
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
