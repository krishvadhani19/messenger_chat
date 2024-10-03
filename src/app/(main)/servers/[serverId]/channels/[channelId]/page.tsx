import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { logout } from "@/server/actions/logout";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { redirect } from "next/navigation";
import ChannelChatSection from "@/components/custom/ChatSection/ChannelChatSection/ChannelChatSection";

type ChannelSlugPagePropsType = {
  params: { serverId: string; channelId: string };
};

const ChannelSlugPage = async ({ params }: ChannelSlugPagePropsType) => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return await logout();
  }

  const currentChannel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id,
    },
  });

  if (!currentChannel || !member) {
    redirect(`/servers/${params.serverId}`);
  }

  return <ChannelChatSection currentChannel={currentChannel} profile={profile} />;
};

export default ChannelSlugPage;
