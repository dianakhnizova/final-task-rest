import { fetchAbortTimeOutMs } from '@/sources/constants';
import type { FetchResponse } from '@/sources/interfaces';

export default async function fetchWithErrorHandling(
  url: string,
  options: RequestInit = {}
): Promise<FetchResponse> {
  const { ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), fetchAbortTimeOutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        response: null,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    return { response, error: null };
  } catch (error) {
    clearTimeout(timeoutId);

    let errorMsg = 'Unknown error occurred';

    if (controller.signal.aborted) {
      errorMsg = 'Request timeout';
    }

    if (error instanceof Error) {
      errorMsg = `Network error: ${error.message}`;
    }

    return {
      response: null,
      error: errorMsg,
    };
  }
}
