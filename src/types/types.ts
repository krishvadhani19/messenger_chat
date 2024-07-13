import { Chanel, Member, Server } from "@prisma/client";

export type FULL_SERVER_TYPE = Server & {
  channels: Chanel[];
  members: Member[];
};
