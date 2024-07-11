"use server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

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
          create: [{ profileId, role: MemberRole.ADMIN }],
        },
      },
    });

    return newServer;
  } catch (error) {
    return { serverCreation: null };
  }
};
