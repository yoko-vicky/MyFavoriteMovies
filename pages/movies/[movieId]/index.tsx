import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { MovieDetail } from '@/components/movies/MovieDetail';
import { getMovieById } from '@/lib/tmdb';
import { MovieDetailContextProvider } from '@/store/MovieDetailContext';
import { MovieState } from '@/types/movies';
import { shapeData } from '@/utils';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const movieId = context.query.movieId;

  if (!movieId) {
    return {
      notFound: true,
    };
  }

  const movie: MovieState | undefined = await getMovieById(+movieId);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie: shapeData(movie),
    },
  };
}

const MovieDetailPage = ({
      movie,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!movie) {
    return <LoadingSpinner />;
  }

  return (
    <MovieDetailContextProvider movie={movie}>
      <MovieDetail />
    </MovieDetailContextProvider>
  );
};

export default MovieDetailPage;
