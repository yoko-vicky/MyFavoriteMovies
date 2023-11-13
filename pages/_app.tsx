import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from '@/components/base/errors/ErrorBoundary';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import { MovieCommonDataContextProvider } from '@/store/MovieCommonDataContext';
import { UserSessionDataContextProvider } from '@/store/UserSessionDataContext';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppWithLayoutProps = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }:AppWithLayoutProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <UserSessionDataContextProvider>
        <MovieCommonDataContextProvider>
          <ErrorBoundary>
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </MovieCommonDataContextProvider>
      </UserSessionDataContextProvider>
    </SessionProvider>
  );
}
