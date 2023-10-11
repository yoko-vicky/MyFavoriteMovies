import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from '@/components/base/errors/ErrorBoundary';
import { MoviesContextProvider } from '@/store/MoviesContext';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ErrorBoundary>
        <MoviesContextProvider>
          <Component {...pageProps} />
        </MoviesContextProvider>
      </ErrorBoundary>
    </SessionProvider>
  );
}
