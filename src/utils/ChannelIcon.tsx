import { HashIcon, MicIcon, VideoIcon } from "@/components/ui/Icons";
import { ChanelType } from "@prisma/client";
import React from "react";

const CHANNEL_TYPE_ICON_MAP = {
  [ChanelType.TEXT]: HashIcon,
  [ChanelType.AUDIO]: MicIcon,
  [ChanelType.VIDEO]: VideoIcon,
};

type ChannelIconPropsType = {
  type: ChanelType;
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
  const IconComponent = CHANNEL_TYPE_ICON_MAP[type];

  if (!IconComponent) {
    return null; // Or a default icon
  }

  return <IconComponent size={size} color={color} onClick={onClick} />;
};

export default ChannelIcon;
