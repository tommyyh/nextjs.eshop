import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt'

export const options: NextAuthOptions = {
  // Providers for authentication
  providers: [
    // Google provider
    Google({
      profile: (profile) => {
        console.log("Google profile: " + profile);
        
        let userRole = "user"

        if (profile?.email == process.env.ADMIN_EMAIL) {
          userRole = 'admin'
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole
        }
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    // Credentials
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        // Check fields
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email }
        })

        // Check for user
        if (!user || !user.password) return null;

        try {
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // Successfully logged in
          if (passwordsMatch) return user;
        } catch {
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }

      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login/error'
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
  }
}