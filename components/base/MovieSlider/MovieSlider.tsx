'use client';

import React from 'react';
import Image from 'next/image';
import { createImageUrl } from '@/lib/tmdb';
import { MovieState } from '@/types/movies';
import { logger } from '@/utils/logger';
import { FreeMode, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import styles from './MovieSlider.module.scss';
import Link from 'next/link';

interface MovieSliderPropsType {
  orient?: 'horizontal' | 'vertical';
  movies: MovieState[];
  delay?: number;
  reverse?: boolean;
}

const breakPointsForVertical = {
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
  1280: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  // 1280: {
  //   slidesPerView: 7,
  //   spaceBetween: 40,
  // },
};

const breakPointsForHorizontal = {
  640: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 60,
  },
};

export const MovieSlider = ({
  orient = 'vertical',
  movies,
  delay = 2500,
  reverse = false,
}: MovieSliderPropsType) => {
  logger.log({ movies });
  return (
    <>
      <Swiper
        spaceBetween={30}
        freeMode={true}
        breakpoints={
          orient === 'vertical'
            ? breakPointsForVertical
            : breakPointsForHorizontal
        }
        modules={[Autoplay, FreeMode]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: reverse,
        }}
        loop={true}
      >
        {movies &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={createImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
                  />
                  {/* <h2 className={styles.title}>{movie.title}</h2> */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default MovieSlider;
