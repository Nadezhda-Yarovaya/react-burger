import { useLayoutEffect, useState } from 'react';

export const useWindowSize = (): number[] => {
  const [size, setSize] = useState<Array<number>>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setTimeout(() => setSize([window.innerWidth, window.innerHeight]), 500);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};
