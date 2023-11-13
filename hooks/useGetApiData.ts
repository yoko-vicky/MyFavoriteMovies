/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { logger } from '@/utils/logger';

const useGetApiData = (fetchFn: any, props?: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    if (isFetched || data) return;

    const getData = async () => {
      setIsLoading(true);

      try {
        const res = await fetchFn(props);
        logger.log({ res });
        setData(res);
      } catch (error) {
        logger.error({ error });
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    setIsFetched(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // TODO: Replace Ref with useCallback or UseState
  }, [isFetched, data, fetchFn, props]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetApiData;
