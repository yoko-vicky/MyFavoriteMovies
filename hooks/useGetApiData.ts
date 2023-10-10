/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { logger } from '@/utils/logger';

const useGetApiData = (fetchFn: any, props?: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const fetchedRef = useRef<boolean>(false);

  useEffect(() => {
    if (fetchedRef.current || data) return;

    const getData = async () => {
      setIsLoading(true);

      try {
        const res = await fetchFn(props);
        logger.log({ res });
        setData(res);
      } catch (error) {
        logger.log({ error });
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    fetchedRef.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedRef.current, data, fetchFn, props]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetApiData;
