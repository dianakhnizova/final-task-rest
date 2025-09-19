import { type ActionFunctionArgs } from 'react-router';
import { HttpMethods, Protocols } from '@/sources/enums';
import { getFinalUrlParams } from '@/utils/fetch/getFinalUrlParams';
import { mergedDataResponse } from '@/utils/fetch/mergeDataResponse';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const protocol = data.protocol || Protocols.HTTPS;
  const url = `${protocol}${data.url}`;
  const method = data.method.toString() || HttpMethods.GET;
  const body = data.body ? JSON.parse(data.body as string) : undefined;
  const rawHeaders = data.headers ? JSON.parse(data.headers as string) : [];
  const headers = Array.isArray(rawHeaders)
    ? Object.fromEntries(
        rawHeaders.map((header: { key: string; value: string }) => [
          header.key,
          header.value,
        ])
      )
    : rawHeaders;

  const finalUrl = getFinalUrlParams(body, method, headers, url);

  const showBody =
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD &&
    method !== HttpMethods.OPTIONS &&
    method !== HttpMethods.DELETE
      ? JSON.stringify(body)
      : undefined;

  try {
    const res = await fetch(url, {
      method,
      body: showBody,
      headers,
    });

    const responseText = await res.text();
    const mergedData = mergedDataResponse(responseText, body);

    const result = {
      ok: true,
      received: mergedData,
      status: res.status,
      finalUrl,
    };

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
