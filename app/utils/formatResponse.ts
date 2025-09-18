import { Parsers } from '@/sources/enums';

export function formatResponse(data: unknown, parser: Parsers | null): string {
  if (!data) return '';

  switch (parser) {
    case Parsers.JSON:
      try {
        return typeof data === 'string'
          ? JSON.stringify(JSON.parse(data), null, 2)
          : JSON.stringify(data, null, 2);
      } catch {
        return String(data);
      }

    case Parsers.TEXT:
      return typeof data === 'string' ? data : JSON.stringify(data, null, 2);

    case Parsers.RAW:
      return typeof data === 'string' ? data : JSON.stringify(data);

    case Parsers.HTML:
    case Parsers.XML:
      if (typeof data === 'string') return data;

      return JSON.stringify(data, null, 2);

    default:
      return typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  }
}
