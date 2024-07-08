"use server";

import * as z from "zod";
import { LoginSchema } from "../schemas/LoginSchema";
import { getUserByEmail } from "../controllers/user";
// import { generateVerificationToken } from "../controllers/verification-token";
// import { sendVerificationToken } from "@/lib/email";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields?.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields?.data;

  const existingUser = await getUserByEmail(email);

  /**
   * Signup using SSO should not use credentials to login
   */
  if (!existingUser || !existingUser?.password) {
    return {
      error: "Please sign in using SSO",
    };
  }

  /**
   * Login but email not verified
   */
  if (!existingUser?.emailVerified) {
    // const verificationToken = await generateVerificationToken(email);

    // await sendVerificationToken({
    //   to: email,
    //   subject: `CaseCobra email confirmation - ${existingUser?.name}`,
    //   html: render(
    //     CaseCobraEmailVerification({
    //       validationCode: verificationToken?.token,
    //     })
    //   ),
    // });

    return {
      success: "Confirmation email sent!",
    };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/home" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error?.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }

  return {
    success: "Login successful!",
  };
};
