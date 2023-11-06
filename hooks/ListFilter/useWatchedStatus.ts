import { useCallback, useState } from 'react';
import { CheckboxOptionItemState } from '@/types';
import { WatchedStatus } from '@/types/movies';
import { UserMovieState } from '@/types/user';

const useWatchedStatus = () => {
  const defaultWatchedStatus = WatchedStatus.UNWATCHED;
  const [watchedStatus, setWatchedStatus] =
    useState<WatchedStatus>(defaultWatchedStatus);

  const watchedStatusOptionItems: CheckboxOptionItemState[] = [
    {
      label: 'Unwatched',
      value: 'unwatched',
      checked: watchedStatus === WatchedStatus.UNWATCHED,
    },
    {
      label: 'Watched',
      value: 'watched',
      checked: watchedStatus === WatchedStatus.WATCHED,
    },
    {
      label: 'All',
      value: 'all',
      checked: watchedStatus === WatchedStatus.ALL,
    },
  ];

  const handleWatchedStatusChange = (newName: string) => {
    setWatchedStatus(newName as WatchedStatus);
  };

  const watchedStatusFilter = useCallback(
    (userMovie: UserMovieState) => {
      if (watchedStatus === WatchedStatus.UNWATCHED) {
        return userMovie.listed && !userMovie.watched;
      }

      if (watchedStatus === WatchedStatus.WATCHED) {
        return userMovie.watched;
      }

      return true;
    },
    [watchedStatus],
  );

  return {
    watchedStatusOptionItems,
    handleWatchedStatusChange,
    watchedStatus,
    watchedStatusFilter,
  };
};

export default useWatchedStatus;
