import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIO } from "@/types/types";
import { NextApiRequest } from "next";

/**
 * When client initiates a web socket connection, it does do by upgrading an existing HTTP connection
 * If the bodyParser is enabled it might interfere and might process the raw data required for Websocket handshake
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

// to avoid parsing
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/sockets/io";
    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO(httpServer, { path, addTrailingSlash: false });

    res.socket.server.io = io;

    res.end();
  }
};

export default ioHandler;
