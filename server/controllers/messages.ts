"use server";

import { db } from "@/lib/db";

type SaveMessagePropsType = {
  content: string;
  memberId: string;
  channelId: string;
  fileUrl?: string;
};

export const saveMessage = async ({
  content,
  memberId,
  channelId,
  fileUrl,
}: SaveMessagePropsType) => {
  try {
    const newMessage = await db.message.create({
      data: {
        content,
        memberId,
        channelId,
        fileUrl,
      },

      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    return newMessage;
  } catch (error) {
    return null;
  }
};
