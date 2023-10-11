import React, { useEffect } from 'react';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { MovieSlider } from '@/components/base/MovieSlider';
import useGetApiData from '@/hooks/useGetApiData';
import { errorToastify } from '@/lib/toast';
import { MovieVariantKeys, useMoviesContext } from '@/store/MoviesContext';
import { SliderDelay } from '@/types/movies';
import { logger } from '@/utils/logger';
import styles from './SliderMovies.module.scss';

interface SliderMoviesPropsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMovies: (props?: any) => void;
  title?: string;
  delay?: SliderDelay;
  reverse?: boolean;
  variant?: MovieVariantKeys;
}

export const SliderMovies = ({
  getMovies,
  title,
  delay = SliderDelay.DEFAULT,
  reverse = false,
  variant,
}: SliderMoviesPropsType) => {
  const { data, error, isLoading } = useGetApiData(getMovies);
  const { updateMovies } = useMoviesContext();

  useEffect(() => {
    if (!data || !variant) return;

    updateMovies(data, variant);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, variant]);

  if (error) {
    logger.log( { error } );
    errorToastify();
    return <div>Something went wrong</div>;
  }

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.slider}>
      {title && data && <h2 className={styles.title}>{title}</h2>}
      <MovieSlider movies={data} delay={delay} reverse={reverse} />
    </div>
  );
};

export default SliderMovies;
