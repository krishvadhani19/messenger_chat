import { Channel } from "@prisma/client";
import { createContext } from "react";

export const ChannelChatSectionContext = createContext<{
  currentChannel: Channel;
}>({ currentChannel: {} as Channel });
