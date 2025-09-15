import { ContentType, HttpMethods } from '@/sources/enums';
import type { FetchPrepare } from '@/sources/interfaces';

export default function fetchPrepare(
  url: string,
  method: RequestInit['method'] = HttpMethods.GET,
  header?: HeadersInit | null,
  body?: BodyInit | object | null,
  contentType: ContentType = ContentType.JSON
): FetchPrepare {
  const urlPrepared = url;
  const options: RequestInit = {
    method: method,
  };

  if (header) {
    options.headers = header;
  } else if (
    body &&
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD
  ) {
    options.headers = {
      'Content-Type': contentType,
    };
  }

  if (body) {
    if (typeof body === 'object' && contentType === ContentType.JSON) {
      options.body = JSON.stringify(body);
    } else {
      options.body = body as BodyInit;
    }
  }

  return { url: urlPrepared, options };
}
