import { Channel } from "@prisma/client";
import { createContext } from "react";

export const ChatSectionContext = createContext<{
  currentChannel: Channel;
}>({ currentChannel: {} as Channel });
