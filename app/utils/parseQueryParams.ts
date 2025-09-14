import { HttpMethods, Protocols, SearchParams } from '@/sources/enums';

export function parseQueryParams(request: Request): {
  targetUrl: string | null;
  method: HttpMethods;
  protocol: Protocols;
} {
  const url = new URL(request.url);

  const targetUrl = url.searchParams.get(SearchParams.URL);
  const method =
    (url.searchParams.get(SearchParams.METHOD) as HttpMethods) ||
    HttpMethods.GET;
  const protocol =
    (url.searchParams.get(SearchParams.PROTOCOL) as Protocols) ||
    HttpMethods.GET;

  console.log('Query params:', { targetUrl, method, protocol });

  return { targetUrl, method, protocol };
}
