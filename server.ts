import express from "express";
import next from "next";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  const httpServer = createServer(server);
  const io = new SocketIOServer(httpServer);

  /**
   * Chat socket
   */
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message1", (data: unknown) => {
      console.log("Received from API:", data);
    });

    socket.emit("message2", { message: "BSDK" });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
