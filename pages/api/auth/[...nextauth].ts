/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';
import { UserState } from '@/types/user';
import { logger } from '@/utils/logger';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#151a23', // Hex color code
    // logo: '', // Absolute URL to image
    // buttonText: '', // Hex color code
  },
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60, // 3days (you can change it to 30 to make it 30 days)
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user: User | AdapterUser;
      trigger?: 'signIn' | 'signUp' | 'update' | undefined;
      session?: any;
    }) => {
      if (trigger === 'update') {
        return {
          ...token,
        };
      }

      return { ...token, ...user };
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log('session in callbacks', { session });
      console.log('token in callbacks', { token });

      let dbUser: UserState | null = null;

      try {
        dbUser = (await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
          include: {
            userMovies: true,
          },
        })) as UserState;
      } catch (error) {
        logger.log({ error });
      }

      if (!dbUser) {
        if (!!session.user.name && !!session.user.email) {
          dbUser = await prisma.user.create({
            data: {
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            },
          });
          dbUser.userMovies = [];
        } else {
          throw new Error('Error in AOuth process.');
        }
      }

      session.user = dbUser;
      return session;
    },
  },
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  return await NextAuth(req, res, authOptions as AuthOptions);
}
