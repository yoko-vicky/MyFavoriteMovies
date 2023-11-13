import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { CollectionPageContent } from '@/components/collection/CollectionPageContent';
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/lib/tmdb';
import { MovieCollectionState, MovieState } from '@/types/movies';
import { shapeData } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

const methodToGetMovies = {
  [MovieCollectionState.TOP_RATED]: () => getTopRatedMovies,
  [MovieCollectionState.POPULAR]: () => getPopularMovies,
  [MovieCollectionState.TRENDING]: () => getTrendingMovies,
  [MovieCollectionState.UPCOMING]: () => getUpcomingMovies,
};

const titleOnCollectionVariant = {
  [MovieCollectionState.TOP_RATED]: () => 'Top rated',
  [MovieCollectionState.POPULAR]: () => 'Popular',
  [MovieCollectionState.TRENDING]: () => 'Trending',
  [MovieCollectionState.UPCOMING]: () => 'Upcoming',
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const variant = context.query.variant;

  const isTopRated = variant === MovieCollectionState.TOP_RATED;
  const isPopular = variant === MovieCollectionState.POPULAR;
  const isTrending = variant === MovieCollectionState.TRENDING;
  const isUpcoming = variant === MovieCollectionState.UPCOMING;
  const isCorrectVariant = isTopRated || isPopular || isTrending || isUpcoming;

  if (!variant || !isCorrectVariant) {
    return {
      notFound: true,
    };
  }

  let movies: MovieState[] = [];
  try {
    movies = await methodToGetMovies[variant]()({});
    return {
      props: {
        movies: shapeData(movies),
        title: titleOnCollectionVariant[variant](),
      },
    };
  } catch (error) {
    logger.error({ error });
    return {
      notFound: true,
    };
  }
}

const MovieCollectionPage = ({
      movies,
      title,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // logger.log({ movies, title });
  return <CollectionPageContent movies={movies} title={title} />;
};

export default MovieCollectionPage;
MovieCollectionPage.getLayout = getLayoutFn('page');
