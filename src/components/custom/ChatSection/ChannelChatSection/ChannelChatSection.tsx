"use client";

import { memo, useEffect } from "react";
import "./ChannelChatSection.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatArea from "../ChatArea/ChatArea";
import { Channel } from "@prisma/client";
import ChatInput from "../ChatInput/ChatInput";
import { CurrentServerStore } from "@/stores/useCurrentServerStore";
import { CHAT_TYPES_MAP } from "@/types/types";

type ChatSectionPropsType = {
  currentChannel: Channel;
};

const ChannelChatSection = ({ currentChannel }: ChatSectionPropsType) => {
  const { setCurrentChannel } = CurrentServerStore();

  useEffect(() => {
    setCurrentChannel(currentChannel);
  }, [currentChannel, setCurrentChannel]);

  return (
    <div className="channel-chat-section-container">
      <ChatHeader
        channelType={currentChannel?.channelType}
        chatHeaderName={currentChannel?.name}
      />

      <ChatArea
        name={currentChannel?.name}
        chatId={currentChannel?.id}
        type={CHAT_TYPES_MAP.channel}
        apiUrl={`/api/messages/${currentChannel?.id}`}
        socketUrl="/api/socket"
        socketQuery={{
          channelId: currentChannel?.id,
          serverId: currentChannel?.serverId,
        }}
      />

      <ChatInput
        placeholder={`Message in channel ${currentChannel.name}`}
        query={{
          channelId: currentChannel?.id,
          serverId: currentChannel?.serverId,
        }}
      />
    </div>
  );
};

export default memo(ChannelChatSection);
