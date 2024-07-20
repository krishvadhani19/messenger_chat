import ServerSearch from "./ServerSearch/ServerSearch";
import ServerChannels from "./ServerChannels/ServerChannels";
import "./ServerSidebarMain.scss";
import { memo, useContext, useMemo } from "react";
import { ServerSidebarContext } from "@/contexts/ServerSidebarContext";
import { ChanelType, MemberRole } from "@prisma/client";
import {
  HashIcon,
  MicIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  VideoIcon,
} from "@/components/ui/Icons";

const iconMap = {
  [ChanelType.TEXT]: <HashIcon />,
  [ChanelType.AUDIO]: <MicIcon />,
  [ChanelType.VIDEO]: <VideoIcon />,
};

const iconRoleMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheckIcon />,
  [MemberRole.ADMIN]: <ShieldAlertIcon />,
};

const ServerSidebarMain = () => {
  const { currentServer, currentUserMember } = useContext(ServerSidebarContext);

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
      (memberItem) => memberItem.id !== currentUserMember?.profile.id
    );
  }, [currentServer?.members, currentUserMember]);

  return (
    <div className="server-sidebar-main">
      <ServerSearch
      // data={[
      //   {
      //     label: "Text channels",
      //     type: "channel",
      //     data: textChannels.map((channelItem) => ({
      //       id: channelItem.id,
      //       name: channelItem.name,
      //       icon: iconMap[channelItem.chanelType],
      //     })),
      //   },
      // ]}
      />

      <ServerChannels />
    </div>
  );
};

export default memo(ServerSidebarMain);
