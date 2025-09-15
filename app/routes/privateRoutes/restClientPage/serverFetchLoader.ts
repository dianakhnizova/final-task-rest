import type { LoaderData } from '@/sources/interfaces';

import { errors as errorMessages } from '@/sources/messages/errors';

import fetchData from '@/utils/fetchData/fetchData';
import { getUrl } from '@/utils/getUrl';
import { parseQueryParams } from '@/utils/parseQueryParams';

import type { Route } from './+types/index.lazy';

export async function serverFetchLoader({
  request,
}: Route.LoaderArgs): Promise<LoaderData> {
  const parsedRequest = parseQueryParams(request);
  const { targetUrl, method, protocol } = parsedRequest;

  if (!targetUrl) {
    return {
      data: null,
      error: null,
      status: null,
    };
  }

  const fullUrl = getUrl(targetUrl, protocol);

  const { response, error } = await fetchData(fullUrl, method);

  if (error) {
    return {
      data: null,
      error: `${errorMessages.httpError} ${error}`,
      status: null,
    };
  }

  const data = (await response?.text()) || '';

  return {
    data: data,
    error: null,
    status: response?.status ?? null,
  };
}
