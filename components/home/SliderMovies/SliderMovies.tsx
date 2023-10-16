import React from 'react';
import { MovieSlider } from '@/components/base/MovieSlider';
import { MovieState, SliderDelay } from '@/types/movies';
import styles from './SliderMovies.module.scss';

interface SliderMoviesPropsType {
  title?: string;
  delay?: SliderDelay;
  reverse?: boolean;
  movies: MovieState[];
}

export const SliderMovies = ({
  title,
  delay = SliderDelay.DEFAULT,
  reverse = false,
  movies,
}: SliderMoviesPropsType) => {
  return (
    <div className={styles.slider}>
      {title && movies && <h2 className={styles.title}>{title}</h2>}
      <MovieSlider movies={movies} delay={delay} reverse={reverse} />
    </div>
  );
};

export default SliderMovies;
