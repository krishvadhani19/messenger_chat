import { useContext } from "react";
import "./ChatHeader.scss";
import { ChatSectionContext } from "@/contexts/ChatSectionContext";
import ChannelIcon from "@/utils/ChannelIcon";

const ChatHeader = () => {
  const { currentChannel } = useContext(ChatSectionContext);

  return (
    <div className="chat-header-container">
      <div className="chat-header-chat-name">
        <ChannelIcon type={currentChannel?.chanelType!} size={26} />

        <span>{currentChannel?.name}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
