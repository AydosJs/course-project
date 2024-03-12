// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/lib/prisma";
// import { compare } from "bcrypt";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     // GitHubProvider({
//     //   clientId: process.env.GITHUB_ID as string,
//     //   clientSecret: process.env.GITHUB_SECRET as string,

//     //   profile(profile) {
//     //     console.log("profile github", profile);

//     //     let isAdmin = false;
//     //     if (profile?.email == "aji3385@gmail.com") {
//     //       isAdmin = true;
//     //     }

//     //     return {
//     //       ...profile,
//     //       isAdmin: isAdmin,
//     //     };
//     //   },
//     // }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID as string,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     // }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//         isAdmin: {},
//       },
//       async authorize(credentials): Promise<User | null> {
//         if (!credentials?.email || !credentials?.password) return null;

//         const userPromise = await prisma.user.findFirst({
//           where: {
//             email: credentials?.email,
//           },
//         });

//         const user = await userPromise;

//         if (user) {
//           const isPasswordValid = await compare(
//             credentials?.password ?? "",
//             user.password,
//           );

//           if (!isPasswordValid) {
//             throw new Error("Invalid password");
//           }

//           await prisma.user.update({
//             where: { email: user.email },
//             data: { updatedAt: new Date() },
//           });

//           return {
//             ...user,
//           } as User;
//         }

//         throw new Error("User not found with given email address");
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.email = token.email;
//       session.user.isAdmin = token.isAdmin;

//       return session;
//     },
//     async jwt({ token, user, account }) {
//       // if (account) {
//       //   token.isAdmin = user.isAdmin;
//       // }
//       if (user) {
//         token.isAdmin = user.isAdmin as boolean;
//         token.id = user.id;
//       }
//       return token;
//     },

//     async signIn({ user, account, profile, email, credentials }) {
//       try {
//         console.log("user", user);
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/auth/login",
//   },
// };

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
    // signIn: ({ user, account, credentials }) => {
    //   console.log(user, account, credentials);
    //   return true;
    // },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.isAdmin = token.isAdmin;

      return session;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update" && session?.name) {
        console.log("uraaaa", session);
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
        token.email = session.email;
      }

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
