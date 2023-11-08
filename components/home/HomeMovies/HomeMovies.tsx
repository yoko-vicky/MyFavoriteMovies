import React from 'react';
import dynamic from 'next/dynamic';
import { MoviesList } from '@/components/base/MoviesList';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { movieListVariant } from '@/constants';
import { useMoviesContext } from '@/store/MoviesContext';
import styles from './HomeMovies.module.scss';

const SliderMovies = dynamic(() => import('../SliderMovies/SliderMovies'), {
  ssr: false,
});

export const HomeMovies = () => {
  const {
    topRatedMovies,
    trendingMovies,
    upcomingMovies,
    popularMovies,
    isSearching,
    searchedMovies,
  } = useMoviesContext();

  if (isSearching) {
    return <LoadingSpinner />;
  }

  if (searchedMovies && searchedMovies.length > 0) {
    // return <SliderMovies title={'Search Result'} movies={searchedMovies} />;
    return (
      <div className={styles.container}>
        <MoviesList movies={searchedMovies} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <SliderMovies
        reverse={true}
        title={movieListVariant.upcoming.title}
        movies={upcomingMovies}
      />
      <SliderMovies
        title={movieListVariant.trending.title}
        movies={trendingMovies}
      />
      <SliderMovies
        reverse={true}
        title={movieListVariant.popular.title}
        movies={popularMovies}
      />
      <SliderMovies
        title={movieListVariant.topRated.title}
        movies={topRatedMovies}
      />
    </div>
  );
};

export default HomeMovies;
