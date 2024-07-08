"use server";

import * as z from "zod";
import { VerifyEmailSchema } from "@/server/schemas/VerifyEmailSchema";
import { db } from "@/lib/db";
import { getVerificationTokenUsingEmail } from "../controllers/verification-token";

export const verifyEmail = async (
  formData: z.infer<typeof VerifyEmailSchema>,
  email: string
) => {
  const validatedFields = VerifyEmailSchema.safeParse(formData);

  if (!validatedFields?.success) {
    return { error: "Invalid fields" };
  }

  const { otp } = validatedFields?.data;

  /**
   * Get verification token from DB using OTP
   */
  const verificationToken = await getVerificationTokenUsingEmail(email);

  // Check if OTP exists for that email
  if (!verificationToken) {
    return { error: "Something went wrong" };
  }

  // Check expiry
  const hasExpired = new Date(verificationToken?.expires) < new Date();
  if (hasExpired) {
    return { error: "OTP expired, please generate new!" };
  }

  // Compare OTP
  if (verificationToken?.token === otp) {
    // Updating email verified of the user
    await db.profile.update({
      where: { email: verificationToken?.email },
      data: { emailVerified: new Date() },
    });

    return { success: "Email confirmed" };
  } else {
    return { error: "OTP does not match" };
  }
};
