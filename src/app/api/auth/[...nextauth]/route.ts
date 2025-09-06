import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await axios.post("http://localhost:8000/api/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (user && user._id && user.email) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name || user.email,
            } as User;
          }

          return null;
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw new Error(
            error.response?.data?.message || "Invalid credentials"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // attach backend JWT if available
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
