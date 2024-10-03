"use client";

import { memo, useCallback, useState } from "react";
import "./ChatInput.scss";
import { z } from "zod";
import { ChatInputSchema } from "@/server/schemas/ChatInputSchema";
import { PlusIcon, SendIcon, SmileIcon } from "@/components/ui/Icons";
import InputField from "@/components/ui/Input/InputField";
import classNames from "classnames";
import { useSocket } from "@/hooks/useSocket";
import { useParams } from "next/navigation";

type ChatInputPropsType = {
  apiUrl: string;
  query: Record<string, any>;
  profileId: string;
  placeholder: string;
};

type ChatInputFormType = z.infer<typeof ChatInputSchema>;

const ChatInput = ({
  apiUrl,
  query,
  profileId,
  placeholder,
}: ChatInputPropsType) => {
  const [formData, setFormData] = useState<ChatInputFormType>({
    content: "",
  });
  const { serverId, channelId } = useParams();
  const { messages, sendMessage } = useSocket();

  const handleSendMessage = useCallback(async () => {
    try {
      sendMessage(
        formData?.content,
        profileId,
        channelId as string,
        serverId as string,
        undefined
      );
      setFormData({ content: "" });
    } catch (error) {
      console.error(error);
    }
  }, [channelId, formData?.content, profileId, sendMessage, serverId]);

  const handleMessageChange = useCallback((val: string) => {
    setFormData({ content: val });
  }, []);

  return (
    <div className="chat-input-area">
      <div className="chat-input-container">
        <div className="chat-input-add-attachment-btn">
          <PlusIcon size={18} />
        </div>

        <div className="chat-input-add-attachment-btn">
          <SmileIcon size={18} />
        </div>

        <div className="chat-input-field-container">
          <InputField
            inputValue={formData?.content}
            onChange={handleMessageChange}
            autoComplete="off"
            placeholder={placeholder}
            onEnterKeyPress={handleSendMessage}
          />
        </div>

        <div
          className={classNames("chat-input-send-btn", {
            disabled: !formData?.content,
          })}
          onClick={handleSendMessage}
        >
          <SendIcon size={18} />
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInput);
