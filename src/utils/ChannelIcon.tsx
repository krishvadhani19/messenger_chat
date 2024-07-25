import { HashIcon, MicIcon, VideoIcon } from "@/components/ui/Icons";
import { ChannelType } from "@prisma/client";
import React from "react";

const CHANNEL_TYPE_ICON_MAP = {
  [ChannelType.TEXT]: HashIcon,
  [ChannelType.AUDIO]: MicIcon,
  [ChannelType.VIDEO]: VideoIcon,
};

type ChannelIconPropsType = {
  type: ChannelType;
  size?: number;
  color?: string;
  onClick?: () => void;
};

const ChannelIcon = ({
  type,
  size = 16,
  color,
  onClick,
}: ChannelIconPropsType) => {
  const IconComponent = CHANNEL_TYPE_ICON_MAP[type!];

  return <IconComponent size={size} color={color} onClick={onClick} />;
};

export default ChannelIcon;
