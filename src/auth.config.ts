// Module Imports
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// File Imports
import { LoginSchema } from "@/server/schemas/LoginSchema";
import { getUserByEmail } from "@/server/controllers/user";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields?.success) {
          const { email, password } = validatedFields?.data;

          const user = await getUserByEmail(email);

          /**
           * SSO login tries credential => do not allow
           */
          if (!user || !user?.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user?.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
