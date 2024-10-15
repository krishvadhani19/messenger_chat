"use client";

import ServerSearch from "./ServerSearch/ServerSearch";
import ServerChannels from "./ServerChannels/ServerChannels";
import "./ServerSidebarMain.scss";
import { memo, useMemo } from "react";
import { ChannelType, MemberRole } from "@prisma/client";
import { ShieldAlertIcon, ShieldCheckIcon } from "@/components/ui/Icons";
import Separator from "@/components/ui/Separator/Separator";
import ChannelIcon from "@/utils/ChannelIcon";
import useCurrentServerStore from "@/stores/useCurrentServerStore";

export const iconRoleMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheckIcon size={16} color="#f43f5e" />,
  [MemberRole.ADMIN]: <ShieldAlertIcon color="#f43f5e" size={16} />,
};

const ServerSidebarMain = () => {
  const { currentUserMember, currentServer } = useCurrentServerStore();

  const textChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (channelItem) => channelItem.channelType === ChannelType.TEXT
    );
  }, [currentServer]);

  const audioChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (channelItem) => channelItem.channelType === ChannelType.AUDIO
    );
  }, [currentServer]);

  const videoChannels = useMemo(() => {
    return currentServer?.channels.filter(
      (channelItem) => channelItem.channelType === ChannelType.VIDEO
    );
  }, [currentServer]);

  const serverMembers = useMemo(() => {
    return currentServer?.members.filter(
      (memberItem) => memberItem.id !== currentUserMember?.id
    );
  }, [currentServer, currentUserMember]);

  return (
    <div className="server-sidebar-main">
      <ServerSearch
        data={[
          {
            label: "Text channels",
            type: "channel",
            data: textChannels?.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: <ChannelIcon type={channelItem?.channelType} size={16} />,
            })),
          },

          {
            label: "Voice channels",
            type: "channel",
            data: audioChannels?.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: <ChannelIcon type={channelItem?.channelType} size={16} />,
            })),
          },

          {
            label: "Video channels",
            type: "channel",
            data: videoChannels?.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: <ChannelIcon type={channelItem?.channelType} size={16} />,
            })),
          },

          {
            label: "Members",
            type: "member",
            data: serverMembers?.map((memberItem) => ({
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
            data: textChannels?.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: <ChannelIcon type={channelItem?.channelType} size={16} />,
              type: channelItem?.channelType,
            }))!,
          },

          {
            label: "Voice channels",
            type: "channel",
            data: audioChannels?.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: <ChannelIcon type={channelItem?.channelType} size={16} />,
              type: channelItem?.channelType,
            }))!,
          },

          {
            label: "Video channels",
            type: "channel",
            data: videoChannels?.map((channelItem) => ({
              id: channelItem?.id,
              name: channelItem?.name,
              icon: <ChannelIcon type={channelItem?.channelType} size={16} />,
              type: channelItem?.channelType,
            }))!,
          },

          {
            label: "Members",
            type: "member",
            data: serverMembers?.map((memberItem) => ({
              id: memberItem.id,
              name: memberItem?.profile.name!,
              icon: iconRoleMap[memberItem?.role]!,
              type: null,
            }))!,
          },
        ]}
      />
    </div>
  );
};

export default memo(ServerSidebarMain);
