import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { CollectionPageContent } from '@/components/collection/CollectionPageContent';
import { getMoviesByGenreId } from '@/lib/tmdb';
import { useMovieCommonDataContext } from '@/store/MovieCommonDataContext';
import { shapeData } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const genreId = context.query.genreId;

  if (!genreId) {
    return {
      notFound: true,
    };
  }

  try {
    const movies = await getMoviesByGenreId(+genreId);

    return {
      props: {
        movies: shapeData(movies),
        genreId: +genreId,
      },
    };
  } catch (error) {
    logger.error({ error });
    return {
      notFound: true,
    };
  }
}

const DiscoverMoviesByGenreId = ({
  movies,
  genreId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { findGenreNameById } = useMovieCommonDataContext();
  const genreName = findGenreNameById(genreId) || '';

  return (
    <CollectionPageContent movies={movies} title={`Movies in "${genreName}"`} />
  );
};

export default DiscoverMoviesByGenreId;
DiscoverMoviesByGenreId.getLayout = getLayoutFn('page');
