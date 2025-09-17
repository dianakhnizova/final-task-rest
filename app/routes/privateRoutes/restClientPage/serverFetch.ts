import { type ActionFunctionArgs } from 'react-router';

import { AppRoutes, HttpMethods, Protocols } from '@/sources/enums';

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
  const rawHeaders = data.headers ? JSON.parse(data.headers as string) : [];
  const headers = Array.isArray(rawHeaders)
    ? Object.fromEntries(
        rawHeaders.map((header: { key: string; value: string }) => [
          header.key,
          header.value,
        ])
      )
    : rawHeaders;

  console.log(body);

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
      body: method !== HttpMethods.GET ? body : undefined,
      headers,
    });

    const responseText = await res.text();
    console.log('Server response:', responseText);

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(responseText);
    } catch {
      parsedResponse = responseText;
    }

    let mergedData: unknown;

    if (body && parsedResponse && typeof parsedResponse === 'object') {
      mergedData = { ...body, ...parsedResponse };
    } else {
      mergedData = parsedResponse ?? body;
    }

    const result = {
      ok: true,
      received: mergedData,
      status: res.status,
      finalUrl,
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
