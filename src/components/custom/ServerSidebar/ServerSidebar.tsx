"use client";

import "./ServerSidebar.scss";
import { Profile } from "@prisma/client";
import { memo, useEffect } from "react";
import { FULL_SERVER_TYPE } from "@/types/types";
import ServerHeader from "./ServerHeader/ServerHeader";
import ServerSidebarMain from "./ServerSidebarMain/ServerSidebarMain";
import useCurrentUserStore from "@/stores/useCurrentUserStore";
import useCurrentServerStore from "@/stores/useCurrentServerStore";

type ServerSidebarPropsType = {
  currentServer: FULL_SERVER_TYPE;
  userProfile: Profile;
};

const ServerSidebar = ({
  currentServer,
  userProfile,
}: ServerSidebarPropsType) => {
  const { setCurrentUser } = useCurrentUserStore();
  const { setCurrentServer } = useCurrentServerStore();

  useEffect(() => {
    setCurrentUser(userProfile);
  }, [setCurrentUser, userProfile]);

  useEffect(() => {
    setCurrentServer(currentServer);
  }, [currentServer, setCurrentServer]);

  return (
    <div className="server-sidebar-container">
      <ServerHeader />

      <ServerSidebarMain />
    </div>
  );
};

export default memo(ServerSidebar);
