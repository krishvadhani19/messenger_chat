import express from "express";
import next from "next";
import http from "http";
import { Server as socketIO } from "socket.io";
// import { saveMessage } from "./server/controllers/messages.ts";
// import { checkServerExistence } from "./server/controllers/server.ts";
import { getCurrentUserId } from "./server/actions/getCurrentUserId";
// import { getCurrentUserProfile } from "./server/controllers/user.ts";
// import { checkChannelExistence } from "./server/controllers/channel.ts";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new socketIO(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("sendMessage", async (data) => {
      console.log({ data });

      /**
       * fetch currentUser
       * UserId is profileId
       */
      const currentUserId = await getCurrentUserId();
    });

    // socket.on("sendMessage", async (data) => {
    //   const { content, memberId, channelId, serverId, fileUrl } = data;

    //   /**
    //    * fetch currentUser
    //    * UserId is profileId
    //    */
    //   const currentUserId = await getCurrentUserId();

    //   /**
    //    * fetch current user profile
    //    */
    //   const currentUserProfile = await getCurrentUserProfile(currentUserId);

    //   /**
    //    *
    //    */
    //   if (!serverId || !channelId || !memberId) {
    //     socket.emit("insufficient_data_error", {
    //       message: "Server ID does not exist",
    //     });
    //   }

    //   /**
    //    * Validate if server exists
    //    */
    //   const server = await checkServerExistence(
    //     serverId,
    //     currentUserProfile?.id
    //   );
    //   if (!server) {
    //     socket.emit("not_found", {
    //       message: "Server does not exist",
    //     });
    //   }

    //   /**
    //    * Validate if channel exists
    //    */
    //   const channel = await checkChannelExistence(channelId, serverId);
    //   if (!channel) {
    //     socket.emit("not_found", {
    //       message: "Channel does not exist",
    //     });
    //   }

    //   const member = server?.members.find(
    //     (memberItem) => memberItem?.profileId === currentUserId
    //   );

    //   if (!member) {
    //     socket.emit("not_found", {
    //       message: "Member not found",
    //     });
    //   }

    //   const newMessage = await saveMessage({
    //     content,
    //     memberId,
    //     channelId,
    //     fileUrl,
    //   });

    //   const channelKey = `chat:${channelId}/messages`;

    //   /**
    //    * Broadcasting to everyone on the channel
    //    */
    //   io.emit(channelKey, newMessage);
    // });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
