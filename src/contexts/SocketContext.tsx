import { Message } from "@prisma/client";
import { createContext } from "react";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  messages: Message[];
  sendMessage: (
    content: string,
    memberId: string,
    channelId: string,
    serverId: string,
    fileUrl?: string
  ) => void;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  messages: [],
  sendMessage: () => {},
});
