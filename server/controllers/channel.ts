"use server";

import { db } from "@/lib/db";

export const checkChannelExistence = async (
  channelId: string,
  serverId: string
) => {
  try {
    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        serverId,
      },
    });

    return channel;
  } catch (error) {
    return null;
  }
};
