import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createImageUrl } from '@/lib/tmdb';
import { useMoviesContext } from '@/store/MoviesContext';
// import { logger } from '@/utils/logger';
import { getReleaseYear } from '@/utils';
import styles from './Hero.module.scss';

export const Hero = () => {
  const { heroMovie } = useMoviesContext();
  // logger.log({ heroMovie });
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        {heroMovie && (
          <div className={styles.imageWrapper}>
            <Image
              src={createImageUrl(heroMovie.backdrop_path, 'w1280')}
              alt={heroMovie.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
            />
            <Link
              className={styles.imageCover}
              href={`/movies/${heroMovie.id}`}
            />
            <div className={styles.movieOverview}>
              <div className={styles.title}>
                <span className={styles.mainTitle}>{heroMovie.title}</span>
                <span className={styles.year}>
                  ({getReleaseYear(heroMovie.release_date)})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
