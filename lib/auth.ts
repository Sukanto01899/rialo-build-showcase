import DiscordProvider from "next-auth/providers/discord";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: { params: { scope: "identify" } },
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && "id" in profile) {
        token.discordId = profile.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.discordId) {
        session.user.id = token.discordId as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
