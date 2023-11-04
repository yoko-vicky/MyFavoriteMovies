import { useState } from 'react';
import { CheckboxOptionItemState } from '@/types';
import { WatchedStatus } from '@/types/movies';

const useWatchedStatus = () => {
  const defaultWatchedStatus = WatchedStatus.UNWATCHED;
  const [watchedStatus, setWatchedStatus] =
    useState<WatchedStatus>(defaultWatchedStatus);

  const watchedStatusOptionItems: CheckboxOptionItemState[] = [
    {
      label: 'Unwatched',
      name: 'unwatched',
      checked: watchedStatus === WatchedStatus.UNWATCHED,
    },
    {
      label: 'Watched',
      name: 'watched',
      checked: watchedStatus === WatchedStatus.WATCHED,
    },
    {
      label: 'All',
      name: 'all',
      checked: watchedStatus === WatchedStatus.ALL,
    },
  ];

  const handleWatchedStatusChange = (newName: string) => {
    setWatchedStatus(newName as WatchedStatus);
  };

  return {
    watchedStatusOptionItems,
    handleWatchedStatusChange,
    watchedStatus,
  };
};

export default useWatchedStatus;
