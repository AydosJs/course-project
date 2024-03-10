import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

const handler: NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        isAdmin: {},
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
            id: user.id,
          };
        }

        throw new Error("User not found with given email address");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
    async jwt({ token, user }) {
      // if (!token.sub) return token;
      if (user) {
        token.isAdmin = user.isAdmin as boolean;
        token.id = user.id as number;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST, handler as AuthOptions };
