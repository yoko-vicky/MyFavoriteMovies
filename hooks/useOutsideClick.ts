import { useEffect } from 'react';

const useOutsideClick = (refs: any[], outsideClickHandler: () => void) => {
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      const isClickedAnyCurrentElements = refs
        .filter((ref) => !!ref)
        .some((ref) => {
          return ref.current?.contains(e.target);
        });

      if (!isClickedAnyCurrentElements) {
        outsideClickHandler();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [outsideClickHandler, refs]);
};

export default useOutsideClick;
