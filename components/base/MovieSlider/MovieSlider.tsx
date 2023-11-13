import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createImageUrl } from '@/lib/tmdb';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import { MovieState, SliderBreakPointState } from '@/types/movies';
import { FreeMode, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './MovieSlider.module.scss';
import MovieAtt from '../MovieAtt/MovieAtt';
import { UserMovieAtt } from '../UserMovieAtt';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

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
  const { getTargetUserMovie } = useUserSessionDataContext();
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
          movies.map((movie) => {
            const targetUserMovie = getTargetUserMovie(movie.id);
            return (
              <SwiperSlide key={movie.id} className={styles.slide}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={createImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
                  />
                </div>
                {targetUserMovie?.movie ? (
                  <UserMovieAtt
                    movie={targetUserMovie.movie}
                    stars={targetUserMovie.stars}
                  />
                ) : (
                  <MovieAtt movie={movie} />
                )}
                <Link href={`/movies/${movie.id}`} className={styles.link} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default MovieSlider;
