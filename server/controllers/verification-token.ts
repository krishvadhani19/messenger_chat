"use server";

import { db } from "@/lib/db";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  try {
    const existingToken = await db.verificationToken.findFirst({
      where: {
        email: email,
      },
    });

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken?.id,
        },
      });
    }

    /**
     * Generating new token with expiry of 1 hour
     */
    const token = crypto.randomInt(1_00_000, 1_000_000) + "";
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    /**
     * Generate new token
     */
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verificationToken;
  } catch (error) {
    console.error("Error in generateVerificationToken:", error);
    throw error;
  }
};
