import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />{' '}
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#efb034"
        />
        <meta name="msapplication-TileColor" content="#efb034" />
        <meta name="theme-color" content="#efb034" />
      </Head>
      <body suppressHydrationWarning={true} className="theme">
        <Main />
        <div id="portal-root" />
        <NextScript />
      </body>
    </Html>
  );
}
