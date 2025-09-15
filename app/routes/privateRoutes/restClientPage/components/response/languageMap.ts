import { Parsers } from '@/sources/enums';

export const languageMap: Record<Parsers, string> = {
  [Parsers.JSON]: Parsers.JSON,
  [Parsers.TEXT]: Parsers.TEXT,
  [Parsers.RAW]: Parsers.TEXT,
  [Parsers.HTML]: Parsers.HTML,
  [Parsers.XML]: Parsers.XML,
};
