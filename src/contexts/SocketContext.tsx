import { createContext } from "react";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
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
  sendMessage: () => {},
});
