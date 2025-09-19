import { AppRoutes, type HttpMethods } from '@/sources/enums';
import type { Header } from '@/sources/interfaces';

export const getFinalUrlParams = (
  body: string | undefined,
  method: HttpMethods | string,
  headers: Header,
  url: string
) => {
  const queryParams = new URLSearchParams({
    method,
    url: btoa(url),
  });

  if (body) {
    queryParams.set('body', btoa(JSON.stringify(body)));
  }

  Object.entries(headers).forEach(([k, v]) => {
    queryParams.set(`h_${k}`, encodeURIComponent(v as string));
  });

  const basePath = AppRoutes.REST_CLIENT.replace(/^\/+/, '');
  const finalUrl = `/${basePath}${AppRoutes.FETCH}?${queryParams.toString()}`;

  return finalUrl;
};
