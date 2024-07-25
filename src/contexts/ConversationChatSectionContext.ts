import { CONVERSATION_WITH_BOTH_MEMBER } from "@/types/types";
import { createContext } from "react";

export const ConversationChatSectionContext = createContext<{
  currentConversation: CONVERSATION_WITH_BOTH_MEMBER;
}>({ currentConversation: {} as CONVERSATION_WITH_BOTH_MEMBER });
