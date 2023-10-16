import React from 'react';
import { movieListVariant } from '@/constants';
import styles from './HomeMovies.module.scss';
import { SliderMovies } from '../SliderMovies';

export const HomeMovies = () => {
  return (
    <div className={styles.container}>
      <SliderMovies title={movieListVariant.topRated.title} movies={[]} />
      <SliderMovies
        reverse={true}
        title={movieListVariant.upcoming.title}
        movies={[]}
      />
      <SliderMovies title={movieListVariant.trending.title} movies={[]} />
      <SliderMovies
        reverse={true}
        title={movieListVariant.popular.title}
        movies={[]}
      />
    </div>
  );
};

export default HomeMovies;
