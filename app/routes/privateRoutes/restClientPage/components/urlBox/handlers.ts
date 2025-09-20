import type { Protocols } from '@/sources/enums';

export const clearUrl = (value: string, protocol: Protocols): string => {
  if (value.length < protocol.length) return '';
  const protocolIndex = value.indexOf(protocol);
  if (protocolIndex !== -1) {
    return value.substring(protocolIndex + protocol.length);
  }
  return value;
};
