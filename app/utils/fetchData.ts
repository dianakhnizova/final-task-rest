import { Methods } from '@/sources/enums';
import type { FetchOptions } from '@/sources/interfaces';

export async function fetchData({ url, method, headers, body }: FetchOptions) {
  const headersObj = headers ? Object.fromEntries(headers) : {};

  const response = await fetch(url, {
    method,
    headers: headersObj,
    body: method === Methods.GET ? undefined : JSON.stringify(body),
  });

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    rawBody: response,
  };
}
