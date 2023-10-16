import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// import { MovieDetail } from '@/components/movies/MovieDetail';
import { getMoviesByGenreId } from '@/lib/tmdb';
import uuid from '@/lib/uuid';
import { MovieState } from '@/types/movies';
import { shapeData } from '@/utils';
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
      },
    };
  } catch (error) {
    logger.log({ error });
    return {
      notFound: true,
    };
  }
}

const DiscoverMoviesByGenreId = ({
      movies,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {movies.map((movie: MovieState) => (
        // TODO: replace MovieDetail with MovieListItem
        // <MovieDetail key={uuid()} />
        <div key={uuid()}>{movie.title}</div>
      ))}
    </>
  );
};

export default DiscoverMoviesByGenreId;
