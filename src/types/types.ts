import { Channel, Conversation, Member, Profile, Server } from "@prisma/client";

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
