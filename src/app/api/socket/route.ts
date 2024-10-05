import { NextResponse } from "next/server";
import { getCurrentUserId } from "../../../../server/actions/getCurrentUserId";
import { checkChannelExistence } from "../../../../server/controllers/channel";
import { saveMessage } from "../../../../server/controllers/messages";
import { checkServerExistence } from "../../../../server/controllers/server";
import { getCurrentUserProfile } from "../../../../server/controllers/user";

export const POST = async (req: Request) => {
  try {
    /**
     * fetch currentUser
     * UserId is profileId
     */
    const currentUserId = await getCurrentUserId();

    if (!currentUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const currentUserProfile = await getCurrentUserProfile(currentUserId);

    if (!currentUserProfile) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { content, channelId, memberId, serverId, fileUrl } =
      await req.json();

    if (!channelId || !memberId || !serverId) {
      return new Response(
        "Main: Missing details required to authenticate the socket connection request",
        { status: 400 }
      );
    }

    const server = await checkServerExistence(serverId, currentUserProfile?.id);

    if (!server) {
      return new Response(
        "Server: Missing details required to authenticate the socket connection request",
        { status: 404 }
      );
    }

    const channel = await checkChannelExistence(channelId, serverId);

    if (!channel) {
      return new Response(
        "Channel: Missing details required to authenticate the socket connection request",
        { status: 404 }
      );
    }

    const member = server?.members.find(
      (memberItem) => memberItem?.profileId === currentUserId
    );

    if (!member) {
      return new Response(
        "Member: Missing details required to authenticate the socket connection request",
        { status: 404 }
      );
    }

    const newMessage = await saveMessage({
      content,
      memberId,
      channelId,
      fileUrl,
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Error in checkSocket:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
