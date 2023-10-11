'use client';

import React from 'react';
import { movieListVariant } from '@/constants';
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrends,
  getUpcomingMovies,
} from '@/lib/tmdb';
import { MovieVariantKeys } from '@/store/MoviesContext';
import styles from './HomeMovies.module.scss';
import { SliderMovies } from '../SliderMovies';

export const HomeMovies = () => {
  return (
    <div className={styles.container}>
      <SliderMovies
        getMovies={getTopRatedMovies}
        title={movieListVariant.topRated.title}
        variant={movieListVariant.topRated.key as MovieVariantKeys}
      />
      <SliderMovies
        getMovies={getUpcomingMovies}
        reverse={true}
        title={movieListVariant.upcoming.title}
        variant={movieListVariant.upcoming.key as MovieVariantKeys}
      />
      <SliderMovies
        getMovies={getTrends}
        title={movieListVariant.trending.title}
        variant={movieListVariant.trending.key as MovieVariantKeys}
      />
      <SliderMovies
        getMovies={getPopularMovies}
        reverse={true}
        title={movieListVariant.popular.title}
        variant={movieListVariant.popular.key as MovieVariantKeys}
      />
      {/* "pAYEQP8gx3w" */}
      {/*  https://www.youtube.com/embed/{key}. */}
      {/* {movie && <YouTubePlayer videoId={movie.key} />} */}
    </div>
  );
};

export default HomeMovies;
