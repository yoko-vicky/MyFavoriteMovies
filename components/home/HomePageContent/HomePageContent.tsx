import React from 'react';
import dynamic from 'next/dynamic';
import { HomeMovies } from '@/components/home/HomeMovies';
import { OgHead } from '@/layout/OgHead';

const Hero = dynamic(() => import('@/components/home/Hero/Hero'), {
  ssr: false,
});

export const HomePageContent = () => {
  return (
    <>
      <OgHead />
      <Hero />
      <HomeMovies />
    </>
  );
};

export default HomePageContent;
