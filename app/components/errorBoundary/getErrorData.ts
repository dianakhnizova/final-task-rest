import { isRouteErrorResponse } from 'react-router';
import { ErrorCode } from '@/sources/enums';
import { messages } from '@/sources/messages';

export const getErrorData = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    if (error.status === ErrorCode.NOT_FOUND) {
      return {
        message: messages.errorBoundary.notFound,
        details: messages.errorBoundary.notFound,
      };
    }

    return {
      message: messages.errorBoundary.error,
      details: error.statusText || messages.errorBoundary.details,
    };
  }

  if (import.meta.env.DEV && error instanceof Error) {
    return {
      message: messages.errorBoundary.oops,
      details: error.message,
      stack: error.stack,
    };
  }

  return {
    message: messages.errorBoundary.oops,
    details: messages.errorBoundary.details,
  };
};
