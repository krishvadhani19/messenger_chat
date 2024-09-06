"use client";

import Badge from "@/components/ui/Badge/Badge";
import { useSocket } from "@/hooks/useSocket";
import "./SocketIndicator.scss";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return <Badge isConnected={isConnected}>Fallback: Polling every 1s</Badge>;
  }

  return <Badge isConnected={isConnected}>Live: Real-time updates</Badge>;
};

export default SocketIndicator;
