"use client";

import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "@/contexts/SocketContext";
import { Socket } from "socket.io-client";
import { Message } from "@prisma/client";
import { useParams } from "next/navigation";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { channelId } = useParams();

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

    /**
     * this will receive all the messages including the one the user sends himself
     * Coz it will saved in the db and after that it will be acknowledged here
     */
    socketInstance.on(`chat:${channelId}/messages`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketInstance.io.on("error", (error) => {
      console.error("Transport error:", error);
    });

    socketInstance.io.on("reconnect_attempt", (attemptNumber) => {
      console.log("Attempting reconnection:", attemptNumber);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [channelId]);

  const sendMessage = useCallback(
    (
      content: string,
      memberId: string,
      channelId: string,
      serverId: string,
      fileUrl?: string
    ) => {
      let data: any = {
        content,
        memberId,
        channelId,
        serverId,
      };

      if (socket) {
        if (fileUrl) {
          data["fileUrl"] = fileUrl;
        }

        socket.emit("sendMessage", data);
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        messages,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
