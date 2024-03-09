import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const userPromise = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        const user = await userPromise;

        if (user) {
          const isPasswordValid = await compare(
            credentials?.password ?? "",
            user.password,
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          await prisma.user.update({
            where: { email: user.email },
            data: { updatedAt: new Date() },
          });

          return {
            ...user,
            id: String(user.id),
          };
        }

        throw new Error("User not found with given email address");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
