import type { HttpMethods } from '@/sources/enums';
import type { Header } from '@/sources/interfaces';

import { CACHE_TTL } from '@/sources/constants/constants';

const responseCache = new Map<
  string,
  {
    data: unknown;
    timestamp: number;
    expires: number;
  }
>();

export const cacheResponse = (
  body: string,
  method: HttpMethods | string,
  headers: Header,
  url: string,
  result: object
) => {
  const cacheKey = JSON.stringify({
    url,
    method,
    body,
    headers,
  });

  const cached = responseCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < cached.expires) {
    return cached.data;
  }

  responseCache.set(cacheKey, {
    data: result,
    timestamp: now,
    expires: CACHE_TTL,
  });

  return result;
};
