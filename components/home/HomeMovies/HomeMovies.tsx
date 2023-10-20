import React from 'react';
import dynamic from 'next/dynamic';
import { movieListVariant } from '@/constants';
import { useMoviesContext } from '@/store/MoviesContext';
import styles from './HomeMovies.module.scss';

const SliderMovies = dynamic(() => import('../SliderMovies/SliderMovies'), {
  ssr: false,
});

export const HomeMovies = () => {
  const { topRatedMovies, trendingMovies, upcomingMovies, popularMovies } =
    useMoviesContext();

  return (
    <div className={styles.container}>
      <SliderMovies
        title={movieListVariant.topRated.title}
        movies={topRatedMovies}
      />
      <SliderMovies
        title={movieListVariant.trending.title}
        movies={trendingMovies}
      />
      <SliderMovies
        reverse={true}
        title={movieListVariant.upcoming.title}
        movies={upcomingMovies}
      />
      <SliderMovies
        reverse={true}
        title={movieListVariant.popular.title}
        movies={popularMovies}
      />
    </div>
  );
};

export default HomeMovies;
