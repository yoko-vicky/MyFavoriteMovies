import React from 'react';
import dynamic from 'next/dynamic';
import { MoviesList } from '@/components/base/MoviesList';
import { SubTitle } from '@/components/base/SubTitle';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { movieListVariant } from '@/constants';
import { useMoviesContext } from '@/store/MoviesContext';
import { MovieCollectionState } from '@/types/movies';
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
    errorMsg,
  } = useMoviesContext();

  const getLinksForCollection = (variant: MovieCollectionState) =>
    `/collection/${variant}`;

  if (isSearching) {
    return <LoadingSpinner />;
  }

  if (errorMsg) {
    return (
      <div className={styles.container}>
        <SubTitle title={'Sorry... Could not find a film'} />
        <div className={styles.errorMsg}>{errorMsg}</div>
      </div>
    );
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
