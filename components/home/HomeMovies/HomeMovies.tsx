import React from 'react';
import dynamic from 'next/dynamic';
import { MoviesList } from '@/components/base/MoviesList';
import { SubTitle } from '@/components/base/SubTitle';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { movieListVariant } from '@/constants';
import { useMoviesContext } from '@/store/MoviesContext';
import { getMoviesWithPosterPath } from '@/utils';
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
    inputWord,
  } = useMoviesContext();

  if (isSearching) {
    return <LoadingSpinner />;
  }

  if (searchedMovies && searchedMovies.length > 0) {
    // return <SliderMovies title={'Search Result'} movies={searchedMovies} />;
    return (
      <div className={styles.container}>
        <SubTitle title={`Titles related to: ${inputWord}`} />
        <MoviesList movies={searchedMovies} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <SliderMovies
        reverse={true}
        title={movieListVariant.upcoming.title}
        movies={getMoviesWithPosterPath(upcomingMovies)}
      />
      <SliderMovies
        title={movieListVariant.trending.title}
        movies={getMoviesWithPosterPath(trendingMovies)}
      />
      <SliderMovies
        reverse={true}
        title={movieListVariant.popular.title}
        movies={getMoviesWithPosterPath(popularMovies)}
      />
      <SliderMovies
        title={movieListVariant.topRated.title}
        movies={getMoviesWithPosterPath(topRatedMovies)}
      />
    </div>
  );
};

export default HomeMovies;
