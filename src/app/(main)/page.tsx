import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { logout } from "@/server/actions/logout";
import { getAllServers } from "@/server/controllers/server";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { redirect } from "next/navigation";

const MainRedirectionPage = async () => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return await logout();
  }

  const servers = await getAllServers(profile?.id);

  const initialServer = servers?.[0];

  const initialChannel = initialServer?.channels?.[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(
    `/servers/${initialServer?.id}/channels/${initialChannel?.id}`
  );
};

export default MainRedirectionPage;
