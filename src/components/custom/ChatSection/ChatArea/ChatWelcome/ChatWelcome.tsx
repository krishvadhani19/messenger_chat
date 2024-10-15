import { CHAT_TYPES, CHAT_TYPES_MAP } from "@/types/types";
import React from "react";
import "./ChatWelcome.scss";
import ChannelIcon from "@/utils/ChannelIcon";
import { ChannelType } from "@prisma/client";

type ChatWelcomePropsType = {
  name: string;
  type: CHAT_TYPES;
  channelType: ChannelType;
};

const ChatWelcome = ({ name, type, channelType }: ChatWelcomePropsType) => {
  return (
    <div className="chat-welcome-container">
      {type === CHAT_TYPES_MAP.channel && (
        <span className="chat-welcome-header">
          <ChannelIcon size={75} type={channelType} />
        </span>
      )}

      <p className="chat-welcome-description">
        {type === CHAT_TYPES_MAP.channel ? "Welcome to #" : ""}
        {name}
      </p>

      <p className="chat-welcome-sub-description">
        {type === CHAT_TYPES_MAP.channel
          ? `This is the start of the #${name} channel`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};

export default ChatWelcome;
