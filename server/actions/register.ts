"use server";

import * as z from "zod";
import { RegisterSchema } from "@/server/schemas/RegisterSchema";
import { createUser, getUserByEmail } from "@/server/controllers/user";
import { generateVerificationToken } from "@/server/controllers/verification-token";

export const register = async (formData: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(formData);

  if (!validatedFields?.success) {
    return { error: "Invalid fields" };
  }

  const { firstName, lastName, email, password } = validatedFields?.data;
  const name = `${firstName} ${lastName}`;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already exist" };
  }

  await createUser(name, email, password);

  console.log({ email });
  await generateVerificationToken(email);

  //   await sendVerificationToken({
  //     to: email,
  //     subject: `CaseCobra email confirmation - ${name}`,
  //     html: render(
  //       CaseCobraEmailVerification({
  //         validationCode: newVerificationToken?.token,
  //       })
  //     ),
  //   });

  return {
    success: "Confirmation email sent!",
  };
};
