import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { Hero } from '@/components/home/Hero';
import { HomeMovies } from '@/components/home/HomeMovies';
import { OgHead } from '@/components/layout/OgHead';
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/lib/tmdb';
import { MoviesContextProvider } from '@/store/MoviesContext';
import { MovieState } from '@/types/movies';
import { shapeData } from '@/utils';
import { logger } from '@/utils/logger';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let topRatedMovies: MovieState[] = [];
  let popularMovies: MovieState[] = [];
  let trendingMovies: MovieState[] = [];
  let upcomingMovies: MovieState[] = [];

  try {
    topRatedMovies = await getTopRatedMovies();
    popularMovies = await getPopularMovies();
    trendingMovies = await getTrendingMovies();
    upcomingMovies = await getUpcomingMovies();

    return {
      props: {
        topRatedMovies: shapeData(topRatedMovies),
        popularMovies: shapeData(popularMovies),
        trendingMovies: shapeData(trendingMovies),
        upcomingMovies: shapeData(upcomingMovies),
      },
    };
  } catch (error) {
    logger.log({ error });
    return {
      notFound: true,
    };
  }
}

export default function Home({
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
        <Hero />
        <HomeMovies />
      </>
    </MoviesContextProvider>
  );
}
