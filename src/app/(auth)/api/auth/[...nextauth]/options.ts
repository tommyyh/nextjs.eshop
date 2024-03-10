import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  // Providers for authentication
  providers: [
    // Google provider
    GoogleProvider({
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
    })
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
  }
}