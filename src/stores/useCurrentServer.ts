import { FULL_SERVER_TYPE } from "@/types/types";
import { APIRequest } from "@/utils/auth-util";
import { Channel, ChannelType, MemberRole } from "@prisma/client";
import toast from "react-hot-toast";
import { create } from "zustand";

type CurrentServerStoreTypes = {
  currentServer: null | FULL_SERVER_TYPE;
  currentChannel: null | Channel;

  setCurrentServer: (server: FULL_SERVER_TYPE) => void;
  setCurrentChannel: (channel: Channel) => void;

  deleteChannelFromServer: (channelId: string) => void;
  updateMemberRole: (memberId: string, newRole: MemberRole) => void;
  removeMemberFromServer: (memberId: string) => void;
  editChannelFromServer: (
    channelId: string,
    channelName: string,
    channelType: ChannelType
  ) => void;
};

const useCurrentServerStore = create<CurrentServerStoreTypes>((set, get) => ({
  currentServer: null,
  currentChannel: null,

  setCurrentServer: (server) => set({ currentServer: server }),
  setCurrentChannel: (channel) => set({ currentChannel: channel }),

  deleteChannelFromServer: async (channelId) => {
    const { currentServer } = get();

    if (!currentServer) {
      toast.error("No server selected.");
      return;
    }

    const response = await APIRequest({
      method: "DELETE",
      url: `/api/channels/delete-channel/${channelId}`,
    });

    console.log({ response });

    set({
      currentServer: {
        ...currentServer,
        channels: currentServer?.channels.filter(
          (channel) => channel.id !== channelId
        ),
      },
    });

    toast.success("Channel deleted successfully!");
  },

  updateMemberRole: async (memberId: string, newRole: MemberRole) => {
    const { currentServer } = get();

    if (!currentServer) {
      toast.error("No server selected.");
      return;
    }

    await APIRequest({
      method: "PATCH",
      url: `/api/members/member-role/${memberId}`,
      data: { role: newRole },
    });

    set({
      currentServer: {
        ...currentServer,
        members: currentServer?.members?.map((member) =>
          member.id === memberId ? { ...member, role: newRole } : member
        ),
      },
    });

    toast.success("Member role updated!");
  },

  removeMemberFromServer: async (memberId: string) => {
    const { currentServer } = get();

    if (!currentServer) {
      toast.error("No member removed.");
      return;
    }

    await APIRequest({
      method: "DELETE",
      url: `/api/members/delete-member/${memberId}`,
    });

    set({
      currentServer: {
        ...currentServer,
        members: currentServer?.members.filter(
          (member) => member.id !== memberId
        ),
      },
    });

    toast.success("Removed member successfully!");
  },

  editChannelFromServer: async (
    channelId: string,
    channelName: string,
    channelType: ChannelType
  ) => {
    const { currentServer } = get();

    if (!currentServer) {
      toast.error("No member removed.");
      return;
    }

    const editedChannel: Channel = await APIRequest({
      method: "PATCH",
      url: `/api/channels/edit-channel/${channelId}`,
      data: {
        channelName: channelName,
        channelType: channelType,
      },
    });

    set({
      currentServer: {
        ...currentServer,
        channels: currentServer?.channels.map((channelItem) =>
          channelItem.id === channelId ? editedChannel : channelItem
        ),
      },
    });

    toast.success("Channel detail updated successfully");
  },
}));

export const CurrentServerStore = useCurrentServerStore.getState();

export default useCurrentServerStore;
