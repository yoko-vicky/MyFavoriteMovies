import React from 'react';
import { MovieSlider } from '@/components/base/MovieSlider';
import { SubTitle } from '@/components/base/SubTitle';
import { MovieState, SliderBreakPointState, SliderDelay } from '@/types/movies';
import styles from './SliderMovies.module.scss';

interface SliderMoviesPropsType {
  title?: string;
  delay?: SliderDelay;
  reverse?: boolean;
  movies: MovieState[];
  breakPoints?: SliderBreakPointState;
  link?: string;
}

export const SliderMovies = ({
  title,
  delay = SliderDelay.DEFAULT,
  reverse = false,
  movies,
  breakPoints,
  link,
}: SliderMoviesPropsType) => {
  return (
    <div className={styles.slider}>
      {!!title && !!movies && <SubTitle title={title} tag={'h2'} link={link} />}
      <MovieSlider
        movies={movies}
        delay={delay}
        reverse={reverse}
        breakPoints={breakPoints}
      />
    </div>
  );
};

export default SliderMovies;
