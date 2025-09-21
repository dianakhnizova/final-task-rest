import type { TFunction } from 'i18next';
import { isRouteErrorResponse } from 'react-router';
import { ErrorCode } from '@/sources/enums';

export const getErrorData = (error: unknown, t: TFunction) => {
  if (isRouteErrorResponse(error)) {
    if (error.status === ErrorCode.NOT_FOUND) {
      return {
        message: t('errorBoundary.notFound'),
        details: t('errorBoundary.notFound'),
      };
    }

    return {
      message: t('errorBoundary.error'),
      details: error.statusText || t('errorBoundary.details'),
    };
  }

  if (import.meta.env.DEV && error instanceof Error) {
    return {
      message: t('errorBoundary.oops'),
      details: error.message,
      stack: error.stack,
    };
  }

  return {
    message: t('errorBoundary.oops'),
    details: t('errorBoundary.details'),
  };
};
