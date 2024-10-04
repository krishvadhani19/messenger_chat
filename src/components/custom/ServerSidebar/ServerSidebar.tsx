"use client";

import "./ServerSidebar.scss";
import { Profile } from "@prisma/client";
import { memo, useEffect } from "react";
import { FULL_SERVER_TYPE } from "@/types/types";
import ServerHeader from "./ServerHeader/ServerHeader";
import ServerSidebarMain from "./ServerSidebarMain/ServerSidebarMain";
import useCurrentUserStore from "@/stores/useCurrentUser";
import useCurrentServerStore from "@/stores/useCurrentServer";

type ServerSidebarPropsType = {
  currentServer: FULL_SERVER_TYPE;
  userProfile: Profile;
};

const ServerSidebar = ({
  currentServer,
  userProfile,
}: ServerSidebarPropsType) => {
  const { setCurrentUser, setCurrentUserMember } = useCurrentUserStore();
  const { setCurrentServer } = useCurrentServerStore();

  useEffect(() => {
    const currentUserMember = currentServer?.members.find(
      (memberItem) => memberItem?.profileId === userProfile?.id
    );

    setCurrentUserMember(currentUserMember!);
    setCurrentUser(userProfile);

    setCurrentServer(currentServer);
  }, [
    currentServer,
    setCurrentServer,
    setCurrentUser,
    setCurrentUserMember,
    userProfile,
  ]);

  return (
    <div className="server-sidebar-container">
      <ServerHeader />

      <ServerSidebarMain />
    </div>
  );
};

export default memo(ServerSidebar);
