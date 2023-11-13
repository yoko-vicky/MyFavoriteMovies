import React from 'react';
import dynamic from 'next/dynamic';
import { movieListVariant } from '@/constants';
import { useMoviesContext } from '@/store/MoviesContext';
import { MovieCollectionState } from '@/types/movies';
import { getMoviesWithPosterPath } from '@/utils';
import styles from './HomeMovies.module.scss';

const SliderMovies = dynamic(() => import('../SliderMovies/SliderMovies'), {
  ssr: false,
});

export const HomeMovies = () => {
  const { topRatedMovies, trendingMovies, upcomingMovies, popularMovies } =
    useMoviesContext();

  const getLinksForCollection = (variant: MovieCollectionState) =>
    `/collection/${variant}`;

  return (
    <div className={styles.container}>
      <SliderMovies
        reverse={true}
        title={movieListVariant.upcoming.title}
        movies={getMoviesWithPosterPath(upcomingMovies)}
        link={getLinksForCollection(MovieCollectionState.UPCOMING)}
      />
      <SliderMovies
        title={movieListVariant.trending.title}
        movies={getMoviesWithPosterPath(trendingMovies)}
        link={getLinksForCollection(MovieCollectionState.TRENDING)}
      />
      <SliderMovies
        reverse={true}
        title={movieListVariant.popular.title}
        movies={getMoviesWithPosterPath(popularMovies)}
        link={getLinksForCollection(MovieCollectionState.POPULAR)}
      />
      <SliderMovies
        title={movieListVariant.topRated.title}
        movies={getMoviesWithPosterPath(topRatedMovies)}
        link={getLinksForCollection(MovieCollectionState.TOP_RATED)}
      />
    </div>
  );
};

export default HomeMovies;
