"use client";

import { useSocket } from "@/hooks/useSocket";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  return <div className="">SocketIndicator</div>;
};

export default SocketIndicator;
