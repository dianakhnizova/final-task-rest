import { FETCH_ABORT_TIMEOUT_MS } from '@/sources/constants';
import type { FetchResponse } from '@/sources/interfaces';

import { errors as errorMessages } from '@/sources/messages/errors';

export default async function fetchWithErrorHandling(
  url: string,
  options: RequestInit = {}
): Promise<FetchResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    FETCH_ABORT_TIMEOUT_MS
  );

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return response.ok
      ? { response, error: null }
      : {
          response: null,
          error: `${errorMessages.httpError} ${response.status}`,
        };
  } catch (error) {
    clearTimeout(timeoutId);

    return {
      response: null,
      error: controller.signal.aborted
        ? errorMessages.requestTimeout
        : error instanceof Error
          ? `${errorMessages.networkError} ${error.message}`
          : errorMessages.unknownError,
    };
  }
}
