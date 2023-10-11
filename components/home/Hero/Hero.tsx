'use client';

import React from 'react';
import Image from 'next/image';
import { createImageUrl } from '@/lib/tmdb';
import { useMoviesContext } from '@/store/MoviesContext';
import styles from './Hero.module.scss';

export const Hero = () => {
  const { heroMovie } = useMoviesContext();

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
            <div className={styles.imageCover}></div>
            <div className={styles.movieOverview}>
              <h2>{heroMovie.title}</h2>
              <div>{heroMovie.overview}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
