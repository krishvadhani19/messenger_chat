import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponseServerIO } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * When client initiates a web socket connection, it does do by upgrading an existing HTTP connection
 * If the bodyParser is enabled it might interfere and might process the raw data required for Websocket handshake
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ExtendedServer extends NetServer {
  io?: SocketIOServer;
}

function initializeSocketServer(server: ExtendedServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
    path: "/api/sockets/io",
    addTrailingSlash: false,
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("send-message", (msg) => {
      io.emit("update-messages", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
}

export const GET = async (req: NextRequest, res: NextApiResponseServerIO) => {
  if ((res.socket as any).server.io) {
    return NextResponse.json(
      { message: "Socket is already connected" },
      { status: 200 }
    );
  }

  const server = res.socket.server as ExtendedServer;

  try {
    server.io = initializeSocketServer(server);

    return NextResponse.json(
      { message: "Socket server started" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error starting socket server:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};
