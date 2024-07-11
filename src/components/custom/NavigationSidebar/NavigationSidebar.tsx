import React from "react";
import "./NavigationSidebar.scss";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { redirect } from "next/navigation";
import { getAllServers } from "@/server/controllers/server";

const NavigationSidebar = async () => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return redirect("/");
  }

  const servers = await getAllServers(currentUserId!);

  return <div className="navigation-sidebar-container">NavigationSidebar</div>;
};

export default NavigationSidebar;
