import { AuthOptions, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// import { prisma } from '@/lib/prisma';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60, // 3days (you can change it to 30 to make it 30 days)
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
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
      // console.log('session in callbacks', { session });
      // console.log('token in callbacks', { token });

      // TODO: ADD implementation of user register or login custom method and
      // add user data(clips, and others) to session!

      // GITHUB token (* included in session)
      // * name: 'Yoko Saka ',
      // * email: 'sakayoco55@gmail.com',
      // picture: 'https://avatars.githubusercontent.com/u/53027195?v=4',
      // sub: '53027195',
      // id: '53027195',
      // * image: 'https://avatars.githubusercontent.com/u/53027195?v=4',
      // iat: 1695710029,
      // exp: 1698302029,
      // jti: 'cd962896-2dfc-438f-8e62-7fde0b5158bb'

      // GOOGLE token
      //   name: 'Yoko S',
      // email: 'sakayoco55@gmail.com',
      // picture: 'https://lh3.googleusercontent.com/a/ACg8ocKqb4aNbD0qPQoyBV_hePf9g-_7yTSc_Y0QGZkOfKceKQ=s96-c',
      // sub: '109261989974336490528',
      // id: '109261989974336490528',
      // image: 'https://lh3.googleusercontent.com/a/ACg8ocKqb4aNbD0qPQoyBV_hePf9g-_7yTSc_Y0QGZkOfKceKQ=s96-c',
      // iat: 1695710112,
      // exp: 1698302112,
      // jti: '39613ac6-9292-47a9-9836-6caa8052cb16

      // const dbUser = await prisma.user.findUnique( {
      //   where: {

      //   }
      // })
      // session.user = {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   image: dbUser.image,
      // };

      return session;
    },
  },
};
