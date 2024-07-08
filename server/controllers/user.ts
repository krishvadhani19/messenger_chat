"use server";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const currentUser = undefined;

  if (!currentUser) {
    // redirect to login
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: "",
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: "",
      name: "",
      imageUrl: "",
      email: "",
    },
  });

  return newProfile;
};
