import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        isAdmin: {},
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const userPromise = await prisma.user.findFirst({
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
          } as User;
        }

        throw new Error("User not found with given email address");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.isAdmin = token.isAdmin;

      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.isAdmin = false;
      }
      if (user) {
        token.isAdmin = user.isAdmin as boolean;
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
};