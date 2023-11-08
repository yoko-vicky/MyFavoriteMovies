import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createImageUrl } from '@/lib/tmdb';
import { MovieState, SliderBreakPointState } from '@/types/movies';
import { FreeMode, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styles from './MovieSlider.module.scss';

const defaultBreakPoints = {
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

interface MovieSliderPropsType {
  movies: MovieState[];
  delay?: number;
  reverse?: boolean;
  breakPoints?: SliderBreakPointState;
}

export const MovieSlider = ({
  movies,
  delay = 2500,
  reverse = false,
  breakPoints = defaultBreakPoints,
}: MovieSliderPropsType) => {
  // logger.log({ movies });
  return (
    <>
      <Swiper
        spaceBetween={30}
        freeMode={true}
        breakpoints={breakPoints}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper"
        autoplay={{
          delay,
          disableOnInteraction: false,
          reverseDirection: reverse,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
      >
        {!!movies &&
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
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default MovieSlider;
