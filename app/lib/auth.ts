import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/app/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    },
    expires: any;
  }
}

export const authOptions: AuthOptions = {
adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Sign in with email',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    jwt: async ({ token, user, profile, account}) => {
      if (user) {
        token.id = user.id;
      }
      
      // console.log('from callback token: ', token)
      // console.log('from callback user: ', user)
      // console.log('from callback profile: ', profile)
      // console.log('from callback account: ', account)
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
      }
      // console.log('from session session: ', session)
      return session;
    },
    // Use the signIn() callback to control if a user is allowed to sign in.
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  },
  session: {strategy: 'jwt'},
  secret: process.env.NEXTAUTH_SECRET,
};