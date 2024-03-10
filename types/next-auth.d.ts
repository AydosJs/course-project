import { DefaultUser, DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
      email: string;
    } & DefaultSession &
      User;
  }

  interface User extends DefaultUser {
    id: string;
    name: string | null;
    isAdmin: boolean;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    isAdmin: boolean;
  }
}
