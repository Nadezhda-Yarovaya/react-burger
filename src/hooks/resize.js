import React, { useLayoutEffect, useState } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setTimeout(()=>
      setSize([window.innerWidth, window.innerHeight]), 500);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
