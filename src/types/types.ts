import { Chanel, Member, Profile, Server } from "@prisma/client";

export type MEMBER_WITH_PROFILE = Member & {
  profile: Profile;
};

export type FULL_SERVER_TYPE = Server & {
  channels: Chanel[];
  members: MEMBER_WITH_PROFILE[];
};
