"use client";

import { memo } from "react";
import "./ChannelChatSection.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import { ChannelChatSectionContext } from "@/contexts/ChannelChatSectionContext";
import ChatArea from "../ChatArea/ChatArea";
import { Channel } from "@prisma/client";
import ChatInput from "../ChatInput/ChatInput";

type ChatSectionPropsType = {
  currentChannel: Channel;
};

const ChatSection = ({ currentChannel }: ChatSectionPropsType) => {
  return (
    <ChannelChatSectionContext.Provider value={{ currentChannel }}>
      <div className="channel-chat-section-container">
        <ChatHeader
          channelType={currentChannel?.channelType}
          chatHeaderName={currentChannel?.name}
        />

        <ChatArea />

        <ChatInput
          apiUrl="/api/socket/messages"
          placeholder={`Message in channel ${currentChannel.name}`}
          query={{
            channelId: currentChannel?.id,
            serverId: currentChannel?.serverId,
          }}
        />
      </div>
    </ChannelChatSectionContext.Provider>
  );
};

export default memo(ChatSection);
