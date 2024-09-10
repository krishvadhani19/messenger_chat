"use client";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "@/contexts/SocketContext";

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
const socketInstance = io(NEXT_PUBLIC_SITE_URL);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (socketInstance) {
      setIsConnected(true);
      socketInstance.on("message2", (data) => {
        console.log("Received from SERVER ::", data);
        // Execute any command
      });
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketInstance,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
