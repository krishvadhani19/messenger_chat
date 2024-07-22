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
import Separator from "@/components/ui/Separator/Separator";

const iconMap = {
  [ChanelType.TEXT]: <HashIcon size={16} />,
  [ChanelType.AUDIO]: <MicIcon size={16} />,
  [ChanelType.VIDEO]: <VideoIcon size={16} />,
};

const iconRoleMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheckIcon size={16} color="#f43f5e" />,
  [MemberRole.ADMIN]: <ShieldAlertIcon color="#f43f5e" size={16} />,
};

const ServerSidebarMain = () => {
  const { currentServer, currentUserMember } = useContext(ServerSidebarContext);

  const textChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (chanelItem) => chanelItem.chanelType === ChanelType.TEXT
    );
  }, [currentServer]);

  const audioChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (chanelItem) => chanelItem.chanelType === ChanelType.AUDIO
    );
  }, [currentServer]);

  const videoChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (chanelItem) => chanelItem.chanelType === ChanelType.VIDEO
    );
  }, [currentServer]);

  const serverMembers = useMemo(() => {
    return currentServer?.members.filter(
      (memberItem) => memberItem.id !== currentUserMember?.id
    );
  }, [currentServer?.members, currentUserMember]);

  return (
    <div className="server-sidebar-main">
      <ServerSearch
        data={[
          {
            label: "Text channels",
            type: "channel",
            data: textChannels.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: iconMap[channelItem?.chanelType],
            })),
          },

          {
            label: "Voice channels",
            type: "channel",
            data: audioChannels.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: iconMap[channelItem?.chanelType],
            })),
          },

          {
            label: "Video channels",
            type: "channel",
            data: videoChannels.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: iconMap[channelItem?.chanelType],
            })),
          },

          {
            label: "Members",
            type: "member",
            data: serverMembers.map((memberItem) => ({
              id: memberItem.id,
              name: memberItem?.profile.name!,
              icon: iconRoleMap[memberItem?.role]!,
            })),
          },
        ]}
      />

      <Separator />

      <ServerChannels
        data={[
          {
            label: "Text channels",
            type: "channel",
            data: textChannels.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: iconMap[channelItem?.chanelType],
            })),
          },

          {
            label: "Voice channels",
            type: "channel",
            data: audioChannels.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: iconMap[channelItem?.chanelType],
            })),
          },

          {
            label: "Video channels",
            type: "channel",
            data: videoChannels.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: iconMap[channelItem?.chanelType],
            })),
          },

          {
            label: "Members",
            type: "member",
            data: serverMembers.map((memberItem) => ({
              id: memberItem.id,
              name: memberItem?.profile.name!,
              icon: iconRoleMap[memberItem?.role]!,
            })),
          },
        ]}
      />
    </div>
  );
};

export default memo(ServerSidebarMain);
