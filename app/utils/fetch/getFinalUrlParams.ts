import { AppRoutes, type HttpMethods } from '@/sources/enums';
import type { KeyValue } from '@/sources/interfaces';

export const getFinalUrlParams = (
  body: unknown | undefined,
  method: HttpMethods | string,
  headers: KeyValue[] | undefined,
  url: string
) => {
  const queryParams = new URLSearchParams({
    method,
    url: btoa(url),
  });

  if (body) {
    queryParams.set('body', btoa(JSON.stringify(body)));
  }

  if (Array.isArray(headers)) {
    headers.forEach(({ key, value }) => {
      if (key) {
        queryParams.set(`h_${key}`, encodeURIComponent(value));
      }
    });
  }

  const basePath = AppRoutes.REST_CLIENT.replace(/^\/+/, '');
  const finalUrl = `/${basePath}${AppRoutes.FETCH}?${queryParams.toString()}`;

  return finalUrl;
};
