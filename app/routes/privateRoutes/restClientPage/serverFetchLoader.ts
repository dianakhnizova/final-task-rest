import type { HttpMethods } from '@/sources/enums';
import type { LoaderData } from '@/sources/interfaces';

import fetchData from '@/utils/fetch';

import type { Route } from './+types/index.lazy';

export async function serverFetchLoader({
  request,
}: Route.LoaderArgs): Promise<LoaderData> {
  const url = new URL(request.url);

  const targetUrl = url.searchParams.get('url');
  const method = (url.searchParams.get('method') as HttpMethods) || 'GET';

  console.log('Query params:', { targetUrl, method });

  if (!targetUrl) {
    return {
      data: null,
      error: 'Enter URL and click "Server Fetch"',
    };
  }

  try {
    const { response, error } = await fetchData(targetUrl, method);

    if (error) {
      throw new Error(`HTTP error! status: ${error}`);
    }

    const data = (await response?.text()) || '';

    return {
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
