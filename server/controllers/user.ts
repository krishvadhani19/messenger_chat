"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "../actions/getCurrentUserId";

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

export const getCurrentUserProfile = async (currentUserId: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        id: currentUserId,
      },
    });

    return profile;
  } catch (error) {
    return null;
  }
};
