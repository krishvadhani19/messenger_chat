import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  {
    params,
  }: {
    params: { messageId: string };
  }
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

    const { messageId } = params;

    if (!messageId) {
      return new NextResponse("Channel Id missing", { status: 400 });
    }

    const deleteMessage = await db.message.update({
      where: {
        id: messageId,
      },
      data: {
        isDeleted: true,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json(deleteMessage);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
