import { type ActionFunctionArgs } from 'react-router';

import { HttpMethods, Protocols } from '@/sources/enums';

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

  try {
    const res = await fetch(url, {
      method,
      body: method !== HttpMethods.GET ? JSON.stringify(body) : undefined,
      headers,
    });
    const json = await res.json();

    return {
      ok: true,
      received: json,
      status: res.status,
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
