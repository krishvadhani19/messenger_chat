"use server";

import { db } from "@/lib/db";

export const createNewServer = async (
  profileId: string,
  name: string,
  imageUrl: string
) => {
  try {
    const newServer = await db.server.create({
      data: {
        profileId,
        name,
        imageUrl,
        inviteCode: crypto.randomUUID(),
        channels: {
          create: [{ name: "general", profileId }],
        },
        members: {
          create: [{ profileId }],
        },
      },
    });

    return newServer;
  } catch (error) {
    return null;
  }
};
