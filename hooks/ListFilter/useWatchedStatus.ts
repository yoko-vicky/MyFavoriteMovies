import { useCallback, useState } from 'react';
import { OptionItemState } from '@/types';
import { WatchedStatus } from '@/types/movies';
import { UserMovieState } from '@/types/user';

const useWatchedStatus = () => {
  const defaultWatchedStatus = WatchedStatus.LISTED;
  const [watchedStatus, setWatchedStatus] =
    useState<WatchedStatus>(defaultWatchedStatus);

  const watchedStatusOptionItems: OptionItemState[] = [
    {
      label: 'Listed',
      value: 'listed',
      checked: watchedStatus === WatchedStatus.LISTED,
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
      if (watchedStatus === WatchedStatus.LISTED) {
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
