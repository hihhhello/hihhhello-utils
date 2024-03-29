import { debounce } from 'lodash';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Id, toast } from 'react-toastify';

export const createUseLoadingToast = (toastFn: typeof toast) => {
  'use client';

  const useLoadingToast = () => {
    const showLoading = useCallback((message: string) => {
      return toastFn.loading(message);
    }, []);

    const handleSuccess = useCallback(
      ({ message, toastId }: { toastId: Id; message: string }) => {
        toastFn.update(toastId, {
          render: message,
          type: 'success',
          autoClose: 2500,
          isLoading: false,
        });
      },
      [],
    );

    const handleError = useCallback(
      ({ message, toastId }: { toastId: Id; message: string }) => {
        toastFn.update(toastId, {
          render: message,
          type: 'error',
          autoClose: 2500,
          isLoading: false,
        });
      },
      [],
    );

    return useMemo(
      () => ({
        showLoading,
        handleSuccess,
        handleError,
      }),
      [handleError, handleSuccess, showLoading],
    );
  };

  return useLoadingToast;
};

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

export const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const setFalse = useCallback(() => setValue(false), []);
  const setTrue = useCallback(() => setValue(true), []);
  const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

  return useMemo(
    () => ({
      value,
      setFalse,
      setTrue,
      toggle,
      setValue,
    }),
    [setFalse, setTrue, toggle, value],
  );
};
