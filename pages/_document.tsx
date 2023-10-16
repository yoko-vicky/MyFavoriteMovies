import { ToastContainer } from 'react-toastify';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body suppressHydrationWarning={true} className="theme">
        <Main />
        <div id="portal-root" />
        <NextScript />
        <ToastContainer />
      </body>
    </Html>
  );
}
