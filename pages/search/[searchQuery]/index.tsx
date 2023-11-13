import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { SearchMovies } from '@/components/search/SearchMovies';
import { OgHead } from '@/layout/OgHead';
import { getMovieByTitleQuery } from '@/lib/tmdb';
import { SearchContextProvider } from '@/store/SearchContext';
import { getMoviesWithPosterPath } from '@/utils';
import { getLayoutFn } from '@/utils/getLayoutFn';
import { logger } from '@/utils/logger';

const Hero = dynamic(
  () => import('@/components/search/SearchField/SearchField'),
  {
    ssr: false,
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const searchQuery = context.query.searchQuery as string;
  const currentPage = context.query.page as string;

  if (!searchQuery) {
    return {
      notFound: true,
    };
  }

  logger.log({ currentPage });

  try {
    const res = await getMovieByTitleQuery(
      searchQuery,
      currentPage ? +currentPage : undefined,
    );

    logger.log({ res });

    if (!res || !res?.results || !res?.results?.length) {
      return {
        notFound: true,
      };
    }

    const movies = getMoviesWithPosterPath(res.results);

    if (!movies || !movies.length) {
      return {
        notFound: true,
      };
    }

    const totalPages = (res.total_pages as number) || 1;

    return {
      props: {
        currentPage: +currentPage,
        searchQuery,
        movies,
        totalPages,
      },
    };
  } catch (error) {
    logger.error({ error });
    return {
      notFound: true,
    };
  }
}

export default function SearchResultPage({
      currentPage,
      searchQuery,
      movies,
      totalPages,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SearchContextProvider
      currentPage={currentPage}
      searchQuery={searchQuery}
      movies={movies}
      totalPages={totalPages}
    >
      <>
        <OgHead />
        <Hero />
        <SearchMovies />
      </>
    </SearchContextProvider>
  );
}

SearchResultPage.getLayout = getLayoutFn('home');
