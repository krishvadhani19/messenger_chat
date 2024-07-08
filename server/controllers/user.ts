"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const initialProfile = async () => {
  const currentUser = undefined;

  if (!currentUser) {
    // redirect to login
  }

  const profile = await db.profile.findUnique({
    where: {
      id: "",
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      id: "",
      name: "",
      imageUrl: "",
      email: "",
    },
  });

  return newProfile;
};

export const getUserByEmail = async (email: string) => {
  const user = await db.profile.findFirst({
    where: {
      email,
    },
  });

  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.profile.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    return null;
  }
};
