import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { HomeMovies } from '@/components/home/HomeMovies';
import { OgHead } from '@/layout/OgHead';
import {
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/lib/tmdb';
import { MoviesContextProvider } from '@/store/MoviesContext';
import { MovieGenreState, MovieState } from '@/types/movies';
import { shapeData } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

const Hero = dynamic(() => import('@/components/home/Hero/Hero'), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let topRatedMovies: MovieState[] = [];
  let popularMovies: MovieState[] = [];
  let trendingMovies: MovieState[] = [];
  let upcomingMovies: MovieState[] = [];
  let genres: MovieGenreState[] = [];

  try {
    topRatedMovies = await getTopRatedMovies();
    popularMovies = await getPopularMovies();
    trendingMovies = await getTrendingMovies();
    upcomingMovies = await getUpcomingMovies();
    const originGenres = await getGenres();

    genres = originGenres.genres;

    return {
      props: {
        topRatedMovies: shapeData(topRatedMovies),
        popularMovies: shapeData(popularMovies),
        trendingMovies: shapeData(trendingMovies),
        upcomingMovies: shapeData(upcomingMovies),
        genres: shapeData(genres),
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
      genres,
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
      genres={genres}
    >
      <>
        <OgHead />
        <Hero />
        <HomeMovies />
      </>
    </MoviesContextProvider>
  );
}

HomePage.getLayout = getLayoutFn('home');
