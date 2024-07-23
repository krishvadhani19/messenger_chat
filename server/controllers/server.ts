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
            profileId: profileId,
          },
        },
      },
      include: {
        channels: {
          where: {
            name: "general",
          },
          orderBy: {
            createdAt: "asc",
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

export const getServerUsingInviteCode = async (
  inviteCode: string,
  profileId: string
) => {
  try {
    const server = await db.server.findUnique({
      where: {
        inviteCode,
        members: {
          some: {
            profileId,
          },
        },
      },
    });

    return server;
  } catch (error) {
    return null;
  }
};

export const addNewMemberToServer = async (
  inviteCode: string,
  profileId: string
) => {
  try {
    const server = await db.server.update({
      where: {
        inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId,
            },
          ],
        },
      },
    });

    const updatedServer = await db.server.update({
      where: {
        id: server?.id,
      },
      data: {
        inviteCode: crypto.randomUUID(),
      },
    });

    return updatedServer;
  } catch (error) {
    return null;
  }
};

export const updateServerSettings = async (
  serverId: string,
  name: string,
  imageUrl: string
) => {
  try {
    const updatedServer = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return updatedServer;
  } catch (error) {
    return null;
  }
};
