import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';
import { Parsers } from '@/sources/enums';

const { highlight, languages } = Prism;

export const getHighlightedCode = (parser: Parsers) => (code: string) => {
  if (parser === Parsers.RAW) {
    return code;
  }
  return highlight(code, languages[parser] || languages.json, parser);
};
