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

export const getAllServers = async (profileId: string) => {
  try {
    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            profileId,
          },
        },
      },
    });

    return servers;
  } catch (error) {
    return null;
  }
};

export const getServer = async (serverId: string, profileId: string) => {
  try {
    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
          },
        },
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return server;
  } catch (error) {
    return null;
  }
};
