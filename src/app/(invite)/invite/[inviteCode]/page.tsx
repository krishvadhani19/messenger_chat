import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { logout } from "@/server/actions/logout";
import {
  addNewMemberToServer,
  getServer,
  getServerUsingInviteCode,
} from "@/server/controllers/server";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { redirect } from "next/navigation";

type InviteCodePagePropsType = {
  params: { inviteCode: string };
};

const InviteCodePage = async ({ params }: InviteCodePagePropsType) => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    await logout();
    return;
  }

  const { inviteCode } = params;

  if (!inviteCode) {
    return redirect("/home");
  }

  // Already a member
  const existingServer = await getServerUsingInviteCode(
    inviteCode,
    profile?.id!
  );

  if (existingServer) {
    return redirect(`/servers/${existingServer?.id}`);
  }

  // New member
  const server = await addNewMemberToServer(inviteCode, profile?.id);

  if (server) {
    return redirect(`/servers/${server?.id}`);
  }

  return null;
};

export default InviteCodePage;
