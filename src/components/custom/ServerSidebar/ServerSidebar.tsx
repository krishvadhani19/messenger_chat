import { Chanel, Member, Profile, Server } from "@prisma/client";
import { memo, useMemo } from "react";
import "./ServerSidebar.scss";
import { FULL_SERVER_TYPE } from "@/types/types";
import ServerHeader from "./ServerHeader/ServerHeader";

type ServerSidebarPropsType = {
  currentServer: FULL_SERVER_TYPE;
  userProfile: Profile;
};

const ServerSidebar = ({
  currentServer,
  userProfile,
}: ServerSidebarPropsType) => {
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

  let isAdmin, isModerator;

  const serverMembers = useMemo(() => {
    return currentServer?.members.filter(
      (memberItem) => memberItem.id !== userProfile.id
    );
  }, [currentServer, userProfile]);

  const role = useMemo(
    () =>
      currentServer?.members.find(
        (memberItem) => memberItem?.profileId === userProfile?.id
      ),
    [currentServer?.members, userProfile?.id]
  )?.role;

  return (
    <div className="server-sidebar-container">
      <ServerHeader currentServer={currentServer} currentUserRole={role!} />
    </div>
  );
};

export default memo(ServerSidebar);
