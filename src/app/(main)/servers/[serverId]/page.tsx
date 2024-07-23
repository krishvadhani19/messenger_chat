import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { logout } from "@/server/actions/logout";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { redirect } from "next/navigation";

type ServerSlugPagePropsType = {
  params: { serverId: string };
};

const ServersSlugRedirectionPage = async ({
  params,
}: ServerSlugPagePropsType) => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return await logout();
  }

  const server = await db.server.findUnique({
    where: {
      id: params?.serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels?.[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${server?.id}/channels/${initialChannel?.id}`);
};

export default ServersSlugRedirectionPage;
