import { Chanel } from "@prisma/client";
import { createContext } from "react";

export const ChatSectionContext = createContext<{
  currentChannel: Chanel;
}>({ currentChannel: {} as Chanel });
