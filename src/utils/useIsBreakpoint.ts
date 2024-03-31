'use client';

import { debounce } from 'lodash';
import { useLayoutEffect, useState } from 'react';

export enum Breakpoints {
  'SM' = 640,
  'MD' = 768,
  'LG' = 1024,
  'XL' = 1280,
  '2XL' = 1536,
}

export const useIsBreakpoint = (breakpoint: Breakpoints | number) => {
  const [width, setWidth] = useState(0);
  const handleWindowSizeChange = debounce(() => {
    setWidth(window.innerWidth);
  }, 150);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return width > breakpoint;
};
