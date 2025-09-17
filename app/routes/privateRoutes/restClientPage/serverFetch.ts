import { type ActionFunctionArgs } from 'react-router';

import { AppRoutes, HttpMethods, Protocols } from '@/sources/enums';

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
  const finalUrl = `/${basePath}/${AppRoutes.FETCH}?${queryParams.toString()}`;

  try {
    const res = await fetch(url, {
      method,
      body: method !== HttpMethods.GET ? JSON.stringify(body) : undefined,
      headers,
    });

    const responseText = await res.text();

    return {
      ok: true,
      received: responseText,
      status: res.status,
      finalUrl,
    };
  } catch (error) {
    return {
      ok: false,
      received: null,
      status: null,
      error: (error as Error).message,
    };
  }
};
