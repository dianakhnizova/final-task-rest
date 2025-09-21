import { describe, expect, it } from 'vitest';
import { Parsers } from '@/sources/enums';
import { getHighlightedCode } from './handlers';

describe('getHighlightedCode', () => {
  const code = `{"name": "Diana"}`;

  it('returns code unchanged for RAW parser', () => {
    const highlightFn = getHighlightedCode(Parsers.RAW);
    expect(highlightFn(code)).toBe(code);
  });

  it('highlights code for JSON parser', () => {
    const highlightFn = getHighlightedCode(Parsers.JSON);
    const result = highlightFn(code);

    expect(result).toContain('<span');
    expect(result).toContain('Diana');
  });

  it('falls back to JSON highlighting for unknown parser', () => {
    const highlightFn = getHighlightedCode('unknown' as Parsers);
    const result = highlightFn(code);

    expect(result).toContain('<span');
    expect(result).toContain('Diana');
  });
});
