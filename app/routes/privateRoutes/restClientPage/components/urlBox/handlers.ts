import { HttpMethods, Protocols, SearchParams } from '@/sources/enums';
import type { Header, KeyValue } from '@/sources/interfaces';

import { getUrl } from '@/utils/getUrl';
import { interpolate } from '@/utils/interpolate.ts';

export const handleMethod = (
  value: HttpMethods | null,
  setMethod: (method: HttpMethods) => void
) => {
  if (value) setMethod(value);
};

export const handleProtocol = (
  value: Protocols | null,
  setProtocol: (protocol: Protocols) => void
) => {
  if (value) setProtocol(value);
};

export const handleUrl = (value: string, setUrl: (url: string) => void) => {
  setUrl(value);
};

export const handleServerFetch = async (
  url: string,
  method: HttpMethods,
  protocol: Protocols,
  body: string,
  headers: Header[],
  variables: KeyValue[],
  setSearchParams: (url: URLSearchParams) => void
) => {
  if (!url) return;

  try {
    const variablesMap = new Map(variables.map(item => [item.key, item.value]));
    url = interpolate(url, variablesMap);

    const newSearchParams = new URLSearchParams();
    newSearchParams.set(SearchParams.URL, url);
    newSearchParams.set(SearchParams.METHOD, method);
    newSearchParams.set(SearchParams.PROTOCOL, protocol);

    setSearchParams(newSearchParams);

    const fullUrl = getUrl(url, protocol);

    const mergedHeaders = headers.reduce(
      (acc, { key, value }) => {
        key = interpolate(key, variablesMap);
        value = interpolate(value, variablesMap);

        if (key && value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const response = await fetch(fullUrl, {
      method,
      headers: mergedHeaders,
      body:
        method !== HttpMethods.GET
          ? interpolate(body, variablesMap)
          : undefined,
    });

    const responseData = await response.text();

    return {
      data: responseData,
      status: response.status,
    };
  } catch (error) {
    console.log('Error:', error);
  }
};
