"use client";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "@/contexts/SocketContext";
import { Socket } from "socket.io-client";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

    if (!NEXT_PUBLIC_SITE_URL) {
      console.error("NEXT_PUBLIC_SITE_URL is not defined");
      return;
    }

    const socketInstance = io(NEXT_PUBLIC_SITE_URL);

    socketInstance.on("connect", () => {
      console.log("Socket connected successfully");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected. Reason:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connect error: ", err);
      setIsConnected(false);
    });

    socketInstance.io.on("error", (error) => {
      console.error("Transport error:", error);
    });

    socketInstance.io.on("reconnect_attempt", (attemptNumber) => {
      console.log("Attempting reconnection:", attemptNumber);
    });

    socketInstance.emit("message1", { message: "BSDK" });

    socketInstance.on("message2", (data) => {
      console.log({ data, x: "x" });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
