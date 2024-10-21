import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow the Next.js frontend origin
    methods: ["GET", "POST"], // Allow GET and POST methods
    credentials: true, // Allow cookies if needed
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("sendMessage", (data) => {
    try {
      // Acknowledge message delivery to the sender
      socket.emit("message_ack", { ...data, status: "SUCCESS" });
    } catch (error) {
      console.error("Error in sendMessage:", error);
      socket.emit("connect_error", {
        type: "message_error",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  });

  socket.on("message:sent", (data) => {
    try {
      socket.emit(data.id, { newMessage: data.newMessage });
    } catch (error) {
      console.log({ error });
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
