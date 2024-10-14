import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGE_BATCH_SIZE = 10;

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: { channelId: string };
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

    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const { channelId } = params;

    if (!channelId) {
      return new NextResponse("Channel Id missing", { status: 400 });
    }

    let messages: Message[];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGE_BATCH_SIZE,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGE_BATCH_SIZE,
        skip: 1,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGE_BATCH_SIZE) {
      nextCursor = messages[MESSAGE_BATCH_SIZE - 1]?.id;
    }

    return NextResponse.json({
      messages,
      nextCursor,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
