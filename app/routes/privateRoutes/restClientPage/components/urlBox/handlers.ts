import { type HttpMethods } from '@/sources/enums';

export const handleMethod = (
  value: HttpMethods | null,
  setMethod: (method: HttpMethods) => void
) => {
  if (value) setMethod(value);
};

export const handleUrl = (value: string, setUrl: (url: string) => void) => {
  setUrl(value);
};
