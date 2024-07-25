import CustomImage from "@/components/ui/CustomImage/CustomImage";
import "./ChatHeader.scss";
import ChannelIcon from "@/utils/ChannelIcon";
import { ChannelType } from "@prisma/client";

type ChatHeaderPropsType = {
  chatHeaderName: string;
  channelType?: ChannelType;
  chatImageUrl?: string;
};

const ChatHeader = ({
  channelType,
  chatHeaderName,
  chatImageUrl,
}: ChatHeaderPropsType) => {
  return (
    <div className="chat-header-container">
      <div className="chat-header-chat-name">
        {channelType && <ChannelIcon type={channelType} size={26} />}
        {chatImageUrl && (
          <CustomImage
            url={chatImageUrl}
            alt={chatHeaderName || "chat-image"}
            width={36}
            height={36}
          />
        )}

        <span>{chatHeaderName}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
