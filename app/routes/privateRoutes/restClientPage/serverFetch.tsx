import { type ActionFunctionArgs } from 'react-router';

import { HttpMethods, Protocols } from '@/sources/enums';

import { CACHE_TTL } from '@/sources/constants/constants';

const responseCache = new Map<
  string,
  {
    data: unknown;
    timestamp: number;
    expires: number;
  }
>();

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const protocol = data.protocol || Protocols.HTTPS;
  const url = protocol + (data.url as string);
  const method = (data.method as string) || HttpMethods.GET;
  const body =
    data.body && data.body !== '""'
      ? JSON.parse(data.body as string)
      : undefined;
  const headers = data.headers ? JSON.parse(data.headers as string) : {};

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

  try {
    const res = await fetch(url, {
      method,
      body: method !== HttpMethods.GET ? JSON.stringify(body) : undefined,
      headers,
    });

    const responseText = await res.text();

    const result = {
      ok: true,
      received: responseText,
      status: res.status,
    };

    responseCache.set(cacheKey, {
      data: result,
      timestamp: now,
      expires: CACHE_TTL,
    });

    return result;
  } catch (error) {
    return {
      ok: false,
      received: null,
      status: null,
      error: (error as Error).message,
    };
  }
};
