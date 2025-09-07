// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
}
