import { Parsers } from '@/sources/enums';

export type Parser = Parsers;

export const parserList: Parser[] = [
  Parsers.JSON,
  Parsers.TEXT,
  Parsers.RAW,
  Parsers.HTML,
  Parsers.XML,
];
