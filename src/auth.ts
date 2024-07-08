import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { getUserByEmail } from "@/server/controllers/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") {
        return true;
      }

      /**
       * Credential Login must have email verified
       */
      const existingUser = await getUserByEmail(user?.email as string);
      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },

    jwt: async ({ token }) => {
      return token;
    },

    session: ({ session, token }) => {
      if (token?.sub && session?.user) {
        session.user.id = token?.sub as string;
      }

      return session;
    },
  },

  // Use JWT as session startegy coz the database and adapter must be compatible with EDGE
  session: { strategy: "jwt" },

  // Separated providers in authconfig coz some webAPIs is not supported in Edge required for Adapters like Prisma
  ...authConfig,
});
