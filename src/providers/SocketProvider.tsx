"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "@/contexts/SocketContext";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

    if (!NEXT_PUBLIC_SITE_URL) {
      console.error("NEXT_PUBLIC_SITE_URL is not defined");
      return;
    }

    const socketInstance = io(NEXT_PUBLIC_SITE_URL!, {
      path: "/api/sockets/io",
      transports: ["websocket", "polling"],
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (err: Error) => {
      console.error("Socket connect error: ", err);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const contextValue: SocketContextType = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
