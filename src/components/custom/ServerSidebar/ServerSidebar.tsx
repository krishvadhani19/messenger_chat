"use client";

import "./ServerSidebar.scss";
import {
  Channel,
  ChannelType,
  Member,
  MemberRole,
  Profile,
} from "@prisma/client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FULL_SERVER_TYPE } from "@/types/types";
import ServerHeader from "./ServerHeader/ServerHeader";
import { useMutation } from "@tanstack/react-query";
import { APIRequest } from "@/utils/auth-util";
import toast from "react-hot-toast";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";
import { useParams } from "next/navigation";
import ServerSidebarMain from "./ServerSidebarMain/ServerSidebarMain";
import useCurrentUserStore from "@/stores/useCurrentUser";

type ServerSidebarPropsType = {
  currentServer: FULL_SERVER_TYPE;
  userProfile: Profile;
};

type UpdateMemberPropsType = {
  memberId: string;
  newRole: string;
};

const ServerSidebar = ({
  currentServer,
  userProfile,
}: ServerSidebarPropsType) => {
  const [server, setServer] = useState(currentServer);
  const { serverId } = useParams();

  const { setCurrentUser, setCurrentUserMember } = useCurrentUserStore();

  useEffect(() => {
    const currentUserMember = currentServer?.members.find(
      (memberItem) => memberItem?.profileId === userProfile?.id
    );

    setCurrentUserMember(currentUserMember!);

    setCurrentUser(userProfile);
  }, [currentServer?.members, setCurrentUser, setCurrentUserMember, userProfile]);

  const currentUserMember = useMemo(
    () =>
      currentServer?.members.find(
        (memberItem) => memberItem?.profileId === userProfile?.id
      ),
    [currentServer?.members, userProfile?.id]
  );

  // --------------------- Update Member Role ---------------------
  const updateMemberRole = useMutation({
    mutationFn: async ({ memberId, newRole }: UpdateMemberPropsType) =>
      await APIRequest({
        method: "PATCH",
        url: `/api/members/member-role/${memberId}`,
        data: { role: newRole },
      }),
    onSuccess: (updatedMember: Member) => {
      const { id: memberId, role: newRole } = updatedMember;

      setServer((prevServer) => ({
        ...prevServer,
        members: prevServer.members.map((member) =>
          member.id === memberId ? { ...member, role: newRole } : member
        ),
      }));
    },
    onError: () => {
      toast.error("Failed to update member role");
    },
  });

  const handleUpdateMemberRole = useCallback(
    async (memberId: string, newRole: MemberRole) => {
      updateMemberRole.mutate({ memberId, newRole });
    },
    [updateMemberRole]
  );

  // --------------------- Remove Member from server ---------------------
  const removeMemberFromServer = useMutation({
    mutationFn: async (memberId: string) =>
      await APIRequest({
        method: "DELETE",
        url: `/api/members/delete-member/${serverId}/${memberId}`,
      }),
    onSuccess: (deletedMember: Member) => {
      const { id: memberId } = deletedMember;
      setServer((prevServer) => ({
        ...prevServer,
        members: prevServer.members.filter((member) => member.id !== memberId),
      }));
    },
    onError: () => {
      toast.error("Failed to remove member from server.");
    },
  });

  const handleRemoveMemberFromServer = useCallback(
    async (memberId: string) => {
      removeMemberFromServer.mutate(memberId);
    },
    [removeMemberFromServer]
  );

  // --------------------- Delete Channel from server ---------------------
  const deleteChannelFromServer = useMutation({
    mutationFn: async (channelId: string) =>
      await APIRequest({
        method: "DELETE",
        url: `/api/channels/delete-channel/${channelId}`,
      }),
    onSuccess: (deletedChannel: Channel) => {
      const { id: channelId } = deletedChannel;

      setServer((prevServer) => ({
        ...prevServer,
        channels: prevServer.channels.filter(
          (channelItem) => channelItem.id !== channelId
        ),
      }));
    },
    onError: () => {
      toast.error("Failed to delete channel from server.");
    },
  });

  const handleDeleteChannelFromServer = useCallback(
    async (channelId: string) => {
      deleteChannelFromServer.mutate(channelId);
    },
    [deleteChannelFromServer]
  );

  // --------------------- Edit Channel ---------------------

  const editChannelFromServer = useMutation({
    mutationFn: async ({
      channelId,
      channelName,
      channelType,
    }: {
      channelId: string;
      channelName: string;
      channelType: ChannelType;
    }) =>
      await APIRequest({
        method: "PATCH",
        url: `/api/channels/edit-channel/${channelId}`,
        data: {
          channelName: channelName,
          channelType: channelType,
        },
      }),
    onSuccess: (editedChannel: Channel) => {
      const { id: channelId } = editedChannel;

      setServer((prevServer) => ({
        ...prevServer,
        channels: prevServer.channels.map((channelItem) =>
          channelItem.id === channelId ? editedChannel : channelItem
        ),
      }));
    },
    onError: () => {
      toast.error("Failed to edit channel.");
    },
  });

  const handleEditChannelFromServer = useCallback(
    async (
      channelId: string,
      channelName: string,
      channelType: ChannelType
    ) => {
      editChannelFromServer.mutate({ channelId, channelName, channelType });
    },
    [editChannelFromServer]
  );

  return (
    <ServerSidebarContext.Provider
      value={{
        currentServer: server,
        currentUserMember: currentUserMember!,
        updateMemberRole: handleUpdateMemberRole,
        removeMemberFromServer: handleRemoveMemberFromServer,
        deleteChannelFromServer: handleDeleteChannelFromServer,
        editChannelFromServer: handleEditChannelFromServer,
      }}
    >
      <div className="server-sidebar-container">
        <ServerHeader />

        <ServerSidebarMain />
      </div>
    </ServerSidebarContext.Provider>
  );
};

export default memo(ServerSidebar);
