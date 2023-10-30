import React from 'react';
import { Button } from '@/components/base/Button';
import { MoviesList } from '@/components/base/MoviesList';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import { logger } from '@/utils/logger';
import styles from './UserMovies.module.scss';

export const UserMovies = () => {
  const {
    // userForPage,
    // isMyProfile,
    user,
    userListedMovies,
    userWatchedMovies,
  } = useUserProfilePageContext();
  logger.log({ userMovies: user?.userMovies });

  const maxLengthToShow = 12;
  const listedMoviesToShow = userListedMovies.slice(0, maxLengthToShow);
  const watchedMoviesToShow = userWatchedMovies.slice(0, maxLengthToShow);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <MoviesList
          title={`${user?.name}'s List`}
          movies={listedMoviesToShow}
        />
        {userListedMovies.length > maxLengthToShow && (
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
          movies={watchedMoviesToShow}
        />
        {userWatchedMovies.length > maxLengthToShow && (
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
      {/* <SliderMovies title={`${user?.name}'s List`} movies={userListedMovies} /> */}
      {/* <SliderMovies
        title={`${user?.name}'s Watched Movies`}
        movies={userWatchedMovies}
      /> */}
    </div>
  );
};

export default UserMovies;
