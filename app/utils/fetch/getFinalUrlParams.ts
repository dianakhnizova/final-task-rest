import { AppRoutes, type HttpMethods } from '@/sources/enums';

export const getFinalUrlParams = (
  body: string,
  method: HttpMethods | string,
  headers: { key: string; value: string }[],
  url: string
) => {
  const queryParams = new URLSearchParams({
    method,
    url: btoa(url),
  });

  if (body) {
    queryParams.set('body', btoa(JSON.stringify(body)));
  }

  headers.forEach(({ key, value }) => {
    queryParams.set(`h_${key}`, encodeURIComponent(value as string));
  });

  const basePath = AppRoutes.REST_CLIENT.replace(/^\/+/, '');

  return `/${basePath}${AppRoutes.FETCH}?${queryParams.toString()}`;
};
