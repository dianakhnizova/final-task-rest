import { ErrorCode, type HttpMethods } from '@/sources/enums';

import fetchData from '@/utils/fetch';

export const handleMethod = (
  value: HttpMethods | null,
  setMethod: (method: HttpMethods) => void
) => {
  if (value) setMethod(value);
};

export const handleUrl = (value: string, setUrl: (url: string) => void) => {
  setUrl(value);
};

export const handleSend = async (
  url: string,
  method: HttpMethods,
  setResponse: (resp: { status: number | null; body: string | null }) => void
) => {
  const { error, data } = await fetchData(url, method);

  if (error) {
    setResponse({ status: null, body: error });
  } else {
    setResponse({
      status: ErrorCode.OK,
      body: JSON.stringify(data, null, 2),
    });
  }
};
