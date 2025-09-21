import { describe, expect, it } from 'vitest';
import { Parsers } from '@/sources/enums';
import { formatResponse } from '../formatResponse';

describe('formatResponse', () => {
  const obj = { a: 1, b: 2 };
  const str = '{"a":1,"b":2}';
  const invalidStr = '{a:1,b:2}';

  it('returns empty string if data is null or undefined', () => {
    expect(formatResponse(null, Parsers.JSON)).toBe('');
    expect(formatResponse(undefined, Parsers.TEXT)).toBe('');
  });

  it('formats JSON parser correctly', () => {
    expect(formatResponse(obj, Parsers.JSON)).toBe(
      JSON.stringify(obj, null, 2)
    );
    expect(formatResponse(str, Parsers.JSON)).toBe(
      JSON.stringify(obj, null, 2)
    );
    expect(formatResponse(invalidStr, Parsers.JSON)).toBe(invalidStr);
  });

  it('formats TEXT parser correctly', () => {
    expect(formatResponse(obj, Parsers.TEXT)).toBe(
      JSON.stringify(obj, null, 2)
    );
    expect(formatResponse(str, Parsers.TEXT)).toBe(str);
  });

  it('formats RAW parser correctly', () => {
    expect(formatResponse(obj, Parsers.RAW)).toBe(JSON.stringify(obj));
    expect(formatResponse(str, Parsers.RAW)).toBe(str);
  });

  it('formats HTML/XML parser correctly', () => {
    expect(formatResponse(obj, Parsers.HTML)).toBe(
      JSON.stringify(obj, null, 2)
    );
    expect(formatResponse(obj, Parsers.XML)).toBe(JSON.stringify(obj, null, 2));
    expect(formatResponse('<div>test</div>', Parsers.HTML)).toBe(
      '<div>test</div>'
    );
  });

  it('defaults to JSON.stringify with spacing 2 for unknown parser', () => {
    expect(formatResponse(obj, null)).toBe(JSON.stringify(obj, null, 2));
    expect(formatResponse(str, null)).toBe(str);
  });
});
