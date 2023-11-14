import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { createImageUrl } from '@/lib/tmdb';
import Bg from '@/public/images/hero-bg.jpg';
import { useMoviesContext } from '@/store/MoviesContext';
import { getReleaseYear } from '@/utils';
import { logger } from '@/utils/logger';
import styles from './Hero.module.scss';

export const Hero = () => {
  const { heroMovie } = useMoviesContext();

  logger.log({ heroMovie });

  if (!heroMovie) {
    return (
      <div className={clsx(styles.container)}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src={Bg}
              alt={'hero background'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container)}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src={createImageUrl(heroMovie.backdrop_path, 'original')}
            alt={'hero background'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
          />
          <Link
            href={`/movies/${heroMovie.id}`}
            className={styles.imageCover}
          />
          <div className={styles.att}>
            <div className={styles.title}>{heroMovie.title}</div>
            <div className={styles.year}>
              {getReleaseYear(heroMovie.release_date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
