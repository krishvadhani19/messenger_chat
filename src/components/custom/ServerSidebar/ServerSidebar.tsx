"use client";

import { Member, MemberRole, Profile } from "@prisma/client";
import { memo, useCallback, useMemo, useState } from "react";
import "./ServerSidebar.scss";
import { FULL_SERVER_TYPE } from "@/types/types";
import ServerHeader from "./ServerHeader/ServerHeader";
import { useMutation } from "@tanstack/react-query";
import { APIRequest } from "@/utils/auth-util";
import toast from "react-hot-toast";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";
import { useParams } from "next/navigation";

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

  const textChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (chanelItem) => chanelItem.chanelType === "TEXT"
    );
  }, [currentServer]);

  const audioChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (chanelItem) => chanelItem.chanelType === "VIDEO"
    );
  }, [currentServer]);

  const videoChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (chanelItem) => chanelItem.chanelType === "VIDEO"
    );
  }, [currentServer]);

  const serverMembers = useMemo(() => {
    return currentServer?.members.filter(
      (memberItem) => memberItem.id !== userProfile.id
    );
  }, [currentServer, userProfile]);

  return (
    <ServerSidebarContext.Provider
      value={{
        currentServer: server,
        currentUserMember: currentUserMember!,
        updateMemberRole: handleUpdateMemberRole,
        removeMemberFromServer: handleRemoveMemberFromServer,
      }}
    >
      <div className="server-sidebar-container">
        <ServerHeader />
      </div>
    </ServerSidebarContext.Provider>
  );
};

export default memo(ServerSidebar);
