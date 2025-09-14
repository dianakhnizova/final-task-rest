import { isRouteErrorResponse } from 'react-router';

import { ErrorCode } from '@/sources/enums';
import { messages } from '@/sources/messages';

export const getErrorData = (error: unknown) => {
  let message = messages.errorBoundary.oops;
  let details = messages.errorBoundary.details;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === ErrorCode.NOT_FOUND) {
      message = messages.errorBoundary.notFound;
      details = messages.errorBoundary.notFound;
    } else {
      message = messages.errorBoundary.error;
      details = error.statusText || messages.errorBoundary.details;
    }
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return { message, details, stack };
};
