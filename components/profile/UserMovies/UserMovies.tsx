import React from 'react';
import { Button } from '@/components/base/Button';
import { MoviesList } from '@/components/base/MoviesList';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import { getMoviesFromUserMovies } from '@/utils';
import { logger } from '@/utils/logger';
import styles from './UserMovies.module.scss';

export const UserMovies = () => {
  const {
    // userForPage,
    // isMyProfile,
    user,
    listedUserMovies,
    watchedUserMovies,
  } = useUserProfilePageContext();
  logger.log({ userMovies: user?.userMovies });

  const maxLengthToShow = 12;
  const listedUserMoviesToShow = listedUserMovies.slice(0, maxLengthToShow);
  const listedUserMovieMovies = getMoviesFromUserMovies(listedUserMoviesToShow);

  const watchedUserMoviesToShow = watchedUserMovies.slice(0, maxLengthToShow);
  const watchedUserMovieMovies = getMoviesFromUserMovies(
    watchedUserMoviesToShow,
  );

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <MoviesList
          title={`${user?.name}'s List`}
          movies={listedUserMovieMovies}
          userMovies={listedUserMoviesToShow}
        />
        {listedUserMovies.length > maxLengthToShow && (
          <div className={styles.btnWrapper}>
            <Button
              variant={'outlined'}
              label={'more'}
              align="center"
              activeColor="yellow"
            />
          </div>
        )}
      </div>
      <div className={styles.list}>
        <MoviesList
          title={`${user?.name}'s Watched Movies`}
          movies={watchedUserMovieMovies}
          userMovies={watchedUserMoviesToShow}
        />
        {watchedUserMovies.length > maxLengthToShow && (
          <div className={styles.btnWrapper}>
            <Button
              variant={'outlined'}
              label={'more'}
              align="center"
              activeColor="yellow"
            />
          </div>
        )}
      </div>
      {/* <SliderMovies title={`${user?.name}'s List`} movies={listedUserMovies} /> */}
      {/* <SliderMovies
        title={`${user?.name}'s Watched Movies`}
        movies={watchedUserMovies}
      /> */}
    </div>
  );
};

export default UserMovies;
