import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { HomeMovies } from '@/components/home/HomeMovies';
import { OgHead } from '@/layout/OgHead';
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/lib/tmdb';
import { MoviesContextProvider } from '@/store/MoviesContext';
import { shapeData } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

// const Hero = dynamic(() => import('@/components/home/Hero/Hero'), {
//   ssr: false,
// });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const topRatedMovies = await getTopRatedMovies({});
    const popularMovies = await getPopularMovies({});
    const trendingMovies = await getTrendingMovies({});
    const upcomingMovies = await getUpcomingMovies({});

    return {
      props: {
        topRatedMovies: shapeData(topRatedMovies.results) || [],
        popularMovies: shapeData(popularMovies.results) || [],
        trendingMovies: shapeData(trendingMovies.results) || [],
        upcomingMovies: shapeData(upcomingMovies.results) || [],
      },
    };
  } catch (error) {
    logger.error({ error });
    return {
      notFound: true,
    };
  }
}

export default function HomePage({
      topRatedMovies,
      popularMovies,
      trendingMovies,
      upcomingMovies,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!topRatedMovies || !popularMovies || !trendingMovies || !upcomingMovies) {
    return <LoadingSpinner />;
  }

  return (
    <MoviesContextProvider
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      trendingMovies={trendingMovies}
      upcomingMovies={upcomingMovies}
    >
      <>
        <OgHead />
        {/* <Hero /> */}
        <HomeMovies />
      </>
    </MoviesContextProvider>
  );
}

HomePage.getLayout = getLayoutFn('home');
