import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { ProfileOverview } from '@/components/profile/ProfileOverview';
import { UserMovies } from '@/components/profile/UserMovies';
import { prisma } from '@/lib/prisma';
import { UserProfilePageContextProvider } from '@/store/UserProfilePageContext';
import { UserState } from '@/types/user';
import { shapeData } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userId = context.query.userId;

  if (!userId) {
    return {
      notFound: true,
    };
  }

  let user: UserState | null = null;

  try {
    user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!user) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        userForPage: shapeData(user),
      },
    };
  } catch (error) {
    logger.log({ error });
    return {
      notFound: true,
    };
  }
}

const UserProfilePage = ({
  userForPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!userForPage) {
    return <LoadingSpinner />;
  }
  return (
    <UserProfilePageContextProvider  userForPage={userForPage}>
      <ProfileOverview />
      <UserMovies />
    </UserProfilePageContextProvider>
  );
};

export default UserProfilePage;

UserProfilePage.getLayout = getLayoutFn('page');
