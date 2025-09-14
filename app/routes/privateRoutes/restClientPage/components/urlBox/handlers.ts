import {
  ContentType,
  HttpMethods,
  Protocols,
  SearchParams,
} from '@/sources/enums';

import { getUrl } from '@/utils/getUrl';

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
  setSearchParams: (url: URLSearchParams) => void
) => {
  if (!url) return;

  try {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set(SearchParams.URL, url);
    newSearchParams.set(SearchParams.METHOD, method);
    newSearchParams.set(SearchParams.PROTOCOL, protocol);

    setSearchParams(newSearchParams);

    const fullUrl = getUrl(url, protocol);

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': ContentType.JSON,
      },
      body: method !== HttpMethods.GET ? body : undefined,
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
