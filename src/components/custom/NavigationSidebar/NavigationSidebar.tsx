import "./NavigationSidebar.scss";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { redirect } from "next/navigation";
import { getAllServers } from "@/server/controllers/server";
import AddServerButton from "./AddServerButton/AddServerButton";
import { memo } from "react";
import ServerContainer from "./ServerContainer/ServerContainer";

const NavigationSidebar = async () => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return redirect("/");
  }

  const servers = await getAllServers(currentUserId!);

  return (
    <div className="navigation-sidebar-container">
      <AddServerButton />

      <div className="navigation-sidebar-separator" />

      <ServerContainer />
    </div>
  );
};

export default memo(NavigationSidebar);
