"use client";

import "./ChannelChatSection.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import { ChannelChatSectionContext } from "@/contexts/ChannelChatSectionContext";
import ChatArea from "../ChatArea/ChatArea";
import { Channel } from "@prisma/client";

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
      </div>
    </ChannelChatSectionContext.Provider>
  );
};

export default ChatSection;
