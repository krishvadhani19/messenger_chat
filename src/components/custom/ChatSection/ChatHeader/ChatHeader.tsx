import "./ChatHeader.scss";
import ChannelIcon from "@/utils/ChannelIcon";
import { ChannelType } from "@prisma/client";

type ChatHeaderPropsType = {
  chatHeaderName: string;
  channelType?: ChannelType;
};

const ChatHeader = ({ channelType, chatHeaderName }: ChatHeaderPropsType) => {
  return (
    <div className="chat-header-container">
      <div className="chat-header-chat-name">
        {channelType && <ChannelIcon type={channelType} size={26} />}

        <span>{chatHeaderName}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
