import ConversationChatSection from "@/components/custom/ChatSection/ConversationChatSection/ConversationChatSection";
import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { logout } from "@/server/actions/logout";
import { getOrCreateConversation } from "@/server/controllers/conversation";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { redirect } from "next/navigation";
import React from "react";

type ConversationSlugPagePropsType = {
  params: {
    memberId: string;
    serverId: string;
  };
};

const ConversationSlugPage = async ({
  params,
}: ConversationSlugPagePropsType) => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return await logout();
  }

  const { serverId, memberId } = params;

  const currentMember = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile?.id,
    },
  });

  const conversation = await getOrCreateConversation(
    currentMember?.id!,
    memberId
  );

  if (!conversation) {
    redirect(`/servers/${serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne?.profile?.id === profile?.id ? memberTwo : memberOne;

  return <ConversationChatSection conversation={conversation} />;
};

export default ConversationSlugPage;
