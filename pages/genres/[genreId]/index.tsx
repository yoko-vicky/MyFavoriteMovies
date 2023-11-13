import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { CollectionPageContent } from '@/components/collection/CollectionPageContent';
import { getMoviesByGenreId } from '@/lib/tmdb';
import { useMovieCommonDataContext } from '@/store/MovieCommonDataContext';
import { shapeData } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const genreId = context.query.genreId;
  const page = context.query.page;

  if (!genreId) {
    return {
      notFound: true,
    };
  }

  try {
    const movies = await getMoviesByGenreId(+genreId);
    const currentPage = page ? +page : 1;
    const totalPages = movies.total_pages;
    // logger.log('asas', { movies });
    return {
      props: {
        movies: shapeData(movies.results) || [],
        genreId: +genreId,
        currentPage: currentPage || null,
        totalPages: totalPages || null,
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
      currentPage,
      totalPages,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { findGenreNameById } = useMovieCommonDataContext();
  const genreName = findGenreNameById(genreId) || '';

  return (
    <CollectionPageContent
      movies={movies}
      title={`Movies in ${genreName}`}
      currentPage={currentPage}
      totalPages={totalPages}
      pathToPage={`/genres/${genreId}`}
    />
  );
};

export default DiscoverMoviesByGenreId;
DiscoverMoviesByGenreId.getLayout = getLayoutFn('page');
