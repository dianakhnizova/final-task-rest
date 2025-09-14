import { ContentType, HttpMethods } from '@/sources/enums';
import type { FetchResponse } from '@/sources/interfaces';

import fetchPrepare from './fetchPrepare';
import fetchWithErrorHandling from './fetchWithErrorHandling';

export default async function fetchData(
  url: string,
  method: HttpMethods = HttpMethods.GET,
  headers?: HeadersInit | null,
  body?: BodyInit | object | null,
  contentType: ContentType = ContentType.JSON
): Promise<FetchResponse> {
  const { url: preparedUrl, options } = fetchPrepare(
    url,
    method,
    headers,
    body,
    contentType
  );

  const { response, error } = await fetchWithErrorHandling(
    preparedUrl,
    options
  );

  if (error) {
    return { response: null, error };
  }

  return { response, error: null };
}
