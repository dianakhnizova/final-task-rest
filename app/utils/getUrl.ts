import type { Protocols } from '@/sources/enums';

export const getUrl = (url: string, protocol: Protocols) => {
  const fullUrl = url.match(/^https?:\/\//) ? url : `${protocol}${url}`;

  return fullUrl;
};
