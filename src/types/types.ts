import { Channel, Conversation, Member, Profile, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type MEMBER_WITH_PROFILE = Member & {
  profile: Profile;
};

export type FULL_SERVER_TYPE = Server & {
  channels: Channel[];
  members: MEMBER_WITH_PROFILE[];
};

export type CONVERSATION_WITH_BOTH_MEMBER = Conversation & {
  memberOne: Member & { profile: Profile };
} & { memberTwo: Member & { profile: Profile } };

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
