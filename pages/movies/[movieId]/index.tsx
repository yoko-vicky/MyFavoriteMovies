import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { MovieDetail } from '@/components/movies/MovieDetail';
import { prisma } from '@/lib/prisma';
import { getMovieById } from '@/lib/tmdb';
import { MovieDetailContextProvider } from '@/store/MovieDetailContext';
import { MovieState, ReviewState } from '@/types/movies';
import { UserMovieState } from '@/types/user';
import { createReviewItemsFromUserMoviesInDb, shapeData } from '@/utils';
import { logger } from '@/utils/logger';
import { getLayoutFn } from '../../../utils/getLayoutFn';

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

  let movieReviewsInDb: Partial<ReviewState>[] = [];

  // logger.log({ movie, movieId });
  const userMovies: UserMovieState[] | undefined =
    (await prisma.userMovie.findMany({
      where: {
        movieId: +movieId,
        isPublicReview: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })) as unknown as UserMovieState[];

  // logger.log({ userMovies });
  if (userMovies && !!userMovies.length) {
    movieReviewsInDb = createReviewItemsFromUserMoviesInDb(userMovies);
  }

  return {
    props: {
      movie: shapeData(movie),
      movieReviewsInDb: shapeData(movieReviewsInDb),
    },
  };
}

const MovieDetailPage = ({
      movie,
      movieReviewsInDb,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // logger.log({ movieGenres: movie?.genres });
  if (!movie) {
    return <LoadingSpinner />;
  }

  return (
    <MovieDetailContextProvider
      movie={movie}
      movieReviewsInDb={movieReviewsInDb}
    >
      <MovieDetail />
    </MovieDetailContextProvider>
  );
};

export default MovieDetailPage;
MovieDetailPage.getLayout = getLayoutFn('home');
