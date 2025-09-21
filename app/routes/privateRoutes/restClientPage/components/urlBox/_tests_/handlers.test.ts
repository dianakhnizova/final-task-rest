import { describe, expect, it } from 'vitest';
import { Protocols } from '@/sources/enums';
import { clearUrl } from '../handlers';

describe('clearUrl', () => {
  it('removes the protocol from the URL', () => {
    const result = clearUrl('https://example.com', Protocols.HTTPS);
    expect(result).toBe('example.com');
  });

  it('returns empty string if value is shorter than protocol', () => {
    const result = clearUrl('ht', Protocols.HTTPS);
    expect(result).toBe('');
  });

  it('returns original value if protocol is not found', () => {
    const result = clearUrl('ftp://example.com', Protocols.HTTPS);
    expect(result).toBe('ftp://example.com');
  });
});
