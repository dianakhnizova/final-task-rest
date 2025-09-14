import type { LoaderData } from '@/sources/interfaces';

import { errors as errorMessages } from '@/sources/messages/errors';

import fetchData from '@/utils/fetchData/fetchData';
import { parseQueryParams } from '@/utils/parseQueryParams';

import type { Route } from './+types/index.lazy';

export async function serverFetchLoader({
  request,
}: Route.LoaderArgs): Promise<LoaderData> {
  const { targetUrl, method } = parseQueryParams(request);

  if (!targetUrl) {
    return {
      data: null,
      error: null,
      status: null,
    };
  }

  const { response, error } = await fetchData(targetUrl, method);

  if (error) {
    throw new Error(`${errorMessages.httpError} ${error}`);
  }

  const data = (await response?.text()) || '';

  return {
    data: data,
    error: null,
    status: response?.status ?? null,
  };
}
