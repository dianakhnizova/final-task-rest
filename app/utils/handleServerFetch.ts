import {
  ContentType,
  HttpMethods,
  Protocols,
  SearchParams,
} from '@/sources/enums';
import type { Header, KeyValue } from '@/sources/interfaces';

import { getUrl } from './getUrl';
import { interpolate } from './interpolate';

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

    let preparedBody: string | undefined = undefined;

    if (body && method !== HttpMethods.GET) {
      const interpolatedBody = interpolate(body, variablesMap);

      try {
        const parsed = JSON.parse(interpolatedBody);
        preparedBody = JSON.stringify(parsed);

        if (
          !Object.keys(mergedHeaders).some(
            h => h.toLowerCase() === 'content-type'
          )
        ) {
          mergedHeaders['Content-Type'] = ContentType.JSON;
        }
      } catch {
        preparedBody = interpolatedBody;
      }
    }

    const response = await fetch(fullUrl, {
      method,
      headers: mergedHeaders,
      body: preparedBody,
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
