"use client";

import { MemberRole, Profile } from "@prisma/client";
import { memo, useCallback, useMemo, useState } from "react";
import "./ServerSidebar.scss";
import { FULL_SERVER_TYPE } from "@/types/types";
import ServerHeader from "./ServerHeader/ServerHeader";
import { useMutation } from "@tanstack/react-query";
import { APIRequest } from "@/utils/auth-util";
import toast from "react-hot-toast";
import { ManageMemberContext } from "@/contexts/manageMemberContext";

type ServerSidebarPropsType = {
  currentServer: FULL_SERVER_TYPE;
  userProfile: Profile;
};

const ServerSidebar = ({
  currentServer,
  userProfile,
}: ServerSidebarPropsType) => {
  const [server, setServer] = useState(currentServer);

  const updateMemberRole = useMutation({
    mutationFn: async ({
      memberId,
      newRole,
    }: {
      memberId: string;
      newRole: string;
    }) =>
      await APIRequest({
        method: "PATCH",
        url: `/api/members/member-role/${memberId}`,
        data: { role: newRole },
      }),
    onSuccess: (updatedMember) => {
      setServer((prevServer) => ({
        ...prevServer,
        members: prevServer.members.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        ),
      }));
    },
    onError: () => {
      toast.error("Failed to update member role:");
    },
  });

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

  const currentUserMember = useMemo(
    () =>
      currentServer?.members.find(
        (memberItem) => memberItem?.profileId === userProfile?.id
      ),
    [currentServer?.members, userProfile?.id]
  );

  return (
    <ManageMemberContext.Provider
      value={{
        currentServer: server,
        updateMemberRole: async (memberId: string, newRole: MemberRole) => {
          await APIRequest({
            method: "PATCH",
            url: `/api/members/member-role/${memberId}`,
            data: { role: newRole },
          });

          setServer((prevServer) => ({
            ...prevServer,
            members: prevServer.members.map((member) =>
              member.id === memberId ? { ...member, role: newRole } : member
            ),
          }));
        },
        removeMemberFromServer: async (memberId: string) => {
          // await APIRequest({
          //   method: "DELETE",
          //   url: `/api/members/remove-member/${memberId}`,
          // });

          setServer((prevServer) => ({
            ...prevServer,
            members: prevServer.members.filter(
              (member) => member.id !== memberId
            ),
          }));
        },
      }}
    >
      <div className="server-sidebar-container">
        <ServerHeader
          currentServer={server}
          currentUserMember={currentUserMember!}
        />
      </div>
    </ManageMemberContext.Provider>
  );
};

export default memo(ServerSidebar);
