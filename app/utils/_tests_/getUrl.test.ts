import { describe, expect, it } from 'vitest';
import { Protocols } from '@/sources/enums';
import { getUrl } from '../getUrl';

describe('getUrl', () => {
  it('should return the URL as-is if it already has http:// or https://', () => {
    expect(getUrl('http://example.com', Protocols.HTTP)).toBe(
      'http://example.com'
    );
    expect(getUrl('https://example.com', Protocols.HTTPS)).toBe(
      'https://example.com'
    );
  });

  it('should prepend protocol if URL does not start with http:// or https://', () => {
    expect(getUrl('example.com', Protocols.HTTP)).toBe('http://example.com');
    expect(getUrl('example.com', Protocols.HTTPS)).toBe('https://example.com');
  });

  it('should handle URLs with paths correctly', () => {
    expect(getUrl('example.com/path', Protocols.HTTPS)).toBe(
      'https://example.com/path'
    );
  });
});
