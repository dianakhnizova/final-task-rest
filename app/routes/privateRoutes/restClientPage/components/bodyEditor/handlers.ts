import { Parsers } from '@/sources/enums';

export const handleBodyEditor = (
  prettified: boolean,
  parser: Parsers,
  value: string,
  setBody: (value: string) => void,
  setFormattedBody: (value: string) => void
) => {
  setBody(value);

  if (prettified) {
    try {
      const parsed = parser === Parsers.JSON ? JSON.parse(value) : value;
      setFormattedBody(JSON.stringify(parsed, null, 2));
    } catch {
      setFormattedBody(value);
    }
  } else {
    setFormattedBody(value);
  }
};
