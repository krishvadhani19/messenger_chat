import { FULL_SERVER_TYPE, MEMBER_WITH_PROFILE } from "@/types/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { createContext } from "react";

export const ServerSidebarContext = createContext<{
  currentServer: FULL_SERVER_TYPE;
  currentUserMember: MEMBER_WITH_PROFILE;
  updateMemberRole: (memberId: string, newRole: MemberRole) => Promise<void>;
  removeMemberFromServer: (memberId: string) => Promise<void>;
  deleteChannelFromServer: (channelId: string) => Promise<void>;
  editChannelFromServer: (
    channelId: string,
    channelName: string,
    channelType: ChannelType
  ) => Promise<void>;
}>({
  currentServer: {} as FULL_SERVER_TYPE,
  currentUserMember: {} as MEMBER_WITH_PROFILE,
  updateMemberRole: async () => {},
  removeMemberFromServer: async () => {},
  deleteChannelFromServer: async () => {},
  editChannelFromServer: async () => {},
});
