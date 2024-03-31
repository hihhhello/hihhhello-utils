import { useCallback, useMemo } from 'react';
import { Id, toast } from 'react-toastify';

export const createUseLoadingToast = (toastFn: typeof toast) => {
  const useLoadingToast = () => {
    'use client';

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
