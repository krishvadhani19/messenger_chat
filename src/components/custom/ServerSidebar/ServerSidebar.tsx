import { Chanel, Member, Server } from "@prisma/client";
import { memo, useMemo } from "react";

type ServerSidebarPropsType = {
  currentServer: Server & { channels: Chanel[]; members: Member[] };
};

const ServerSidebar = ({ currentServer }: ServerSidebarPropsType) => {
  const textChannels = useMemo(() => {
    return currentServer?.channels.filter((chanelItem) => {
      return chanelItem.chanelType === "TEXT";
    });
  }, [currentServer]);

  const audioChannels = useMemo(() => {
    return currentServer?.channels.filter((chanelItem) => {
      return chanelItem.chanelType === "AUDIO";
    });
  }, [currentServer]);

  const videoChannels = useMemo(() => {
    return currentServer?.channels.filter((chanelItem) => {
      return chanelItem.chanelType === "VIDEO";
    });
  }, [currentServer]);

  return <div className="server-sidebar-container">ServerSidebar</div>;
};

export default memo(ServerSidebar);
