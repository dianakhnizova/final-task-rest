import { HttpMethods, SearchParams } from '@/sources/enums';

export function parseQueryParams(request: Request): {
  targetUrl: string | null;
  method: HttpMethods;
} {
  const url = new URL(request.url);

  const targetUrl = url.searchParams.get(SearchParams.URL);
  const method =
    (url.searchParams.get(SearchParams.METHOD) as HttpMethods) ||
    HttpMethods.GET;

  console.log('Query params:', { targetUrl, method });

  return { targetUrl, method };
}
