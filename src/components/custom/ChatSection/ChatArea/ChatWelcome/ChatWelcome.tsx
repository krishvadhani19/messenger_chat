import { CHAT_TYPES, CHAT_TYPES_MAP } from "@/types/types";
import React from "react";
import "./ChatWelcome.scss";
import { HashIcon } from "@/components/ui/Icons";

type ChatWelcomePropsType = {
  name: string;
  type: CHAT_TYPES;
};

const ChatWelcome = ({ name, type }: ChatWelcomePropsType) => {
  return (
    <div className="chat-welcome-container">
      {type === CHAT_TYPES_MAP.channel && (
        <HashIcon className="chat-welcome-header" size={75} />
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
