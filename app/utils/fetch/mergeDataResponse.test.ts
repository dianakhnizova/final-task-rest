import { describe, expect, it } from 'vitest';
import { mergedDataResponse } from './mergeDataResponse';

describe('mergedDataResponse', () => {
  it('merges response and body when both are valid JSON objects', () => {
    const responseText = JSON.stringify({ a: 1, b: 2 });
    const body = JSON.stringify({ b: 3, c: 4 });

    const result = mergedDataResponse(responseText, body);

    expect(result).toEqual({ a: 1, b: 2, c: 4 });
  });

  it('returns parsed response when body is null', () => {
    const responseText = JSON.stringify({ a: 1 });

    const result = mergedDataResponse(responseText, null);

    expect(result).toEqual({ a: 1 });
  });

  it('returns parsed body when responseText is invalid JSON', () => {
    const responseText = 'invalid JSON';
    const body = JSON.stringify({ b: 2 });

    const result = mergedDataResponse(responseText, body);

    expect(result).toEqual('invalid JSON');
  });

  it('returns raw responseText when both responseText and body are invalid JSON', () => {
    const responseText = 'not json';
    const body = 'also not json';

    const result = mergedDataResponse(responseText, body);

    expect(result).toEqual('not json');
  });

  it('merges objects even if body is a JSON object and responseText is a stringified number', () => {
    const responseText = '42';
    const body = JSON.stringify({ a: 1 });

    const result = mergedDataResponse(responseText, body);

    expect(result).toBe(42);
  });

  it('returns null if both responseText and body are nullish', () => {
    const result = mergedDataResponse('', null);
    expect(result).toBe('');
  });
});
