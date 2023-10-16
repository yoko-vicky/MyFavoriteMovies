import React from 'react';
import Head from 'next/head';
import { defaultOg } from '@/constants';

export interface OgHeadPropsType {
  siteName?: string;
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const OgHead = ({
  siteName: _siteName,
  title: _title,
  description: _description,
  path,
  imageUrl: _imageUrl,
  imageWidth: _imageWidth,
  imageHeight: _imageHeight,
}: OgHeadPropsType) => {
  const siteName = _siteName || defaultOg.siteName;
  const title = _title || defaultOg.title;
  const description = _description || defaultOg.description;
  const url = `${defaultOg.url}${path}` || defaultOg.url;
  const imageUrl = _imageUrl || defaultOg.imageUrl;
  const imageWidth = _imageWidth || defaultOg.imageWidth;
  const imageHeight = _imageHeight || defaultOg.imageHeight;

  return (
    <Head>
      <title>{title}</title> <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      {/*<!-- Google / Search Engine Tags -->*/}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={imageUrl} />
      {/*<!-- Facebook Meta Tags -->*/}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      {/* <meta property="og:image:alt" content={String(imageAlt)} /> */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      {/*<!-- Twitter Meta Tags -->*/}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultOg.twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default OgHead;
