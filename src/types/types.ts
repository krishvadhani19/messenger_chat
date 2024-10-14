import {
  Channel,
  Conversation,
  Member,
  Message,
  Profile,
  Server,
} from "@prisma/client";
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

export type MESSAGE_WITH_MEMBER_WITH_PROFILE = Message & {
  member: MEMBER_WITH_PROFILE;
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

export const CHAT_TYPES_MAP = {
  channel: "CHANNEL",
  conversation: "CONVERSATION",
} as const;

export type CHAT_TYPES = (typeof CHAT_TYPES_MAP)[keyof typeof CHAT_TYPES_MAP];
