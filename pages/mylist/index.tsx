import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { MyListContent } from '@/components/mylist/MyListContent';
import { authOptions } from '@/lib/nextAuth';
import { UserListPageContextProvider } from '@/store/UserListPageContext';
import { shapeData } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  logger.log({ session });
  if (!session || !session.user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: shapeData(session.user),
    },
  };
}

const MyListPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <UserListPageContextProvider user={user}>
      <MyListContent />
    </UserListPageContextProvider>
  );
};

export default MyListPage;

MyListPage.getLayout = getLayoutFn('page');
