import { useEffect } from 'react';

const useAlertBeforeClosingWindow = (whileTime: boolean) => {
  const handleBeforeCloseWindow = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    if (!whileTime) return;
    window.addEventListener('beforeunload', handleBeforeCloseWindow);

    return () =>
      window.removeEventListener('beforeunload', handleBeforeCloseWindow);
  }, [whileTime]);

  return {};
};

export default useAlertBeforeClosingWindow;
