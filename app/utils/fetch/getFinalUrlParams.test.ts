import { describe, expect, it } from 'vitest';
import { HttpMethods } from '@/sources/enums';
import { getFinalUrlParams } from './getFinalUrlParams';

describe('getFinalUrlParams', () => {
  it('handles undefined body and headers', () => {
    const method: HttpMethods = HttpMethods.GET;
    const url = 'https://api.test.com';

    const result = getFinalUrlParams(undefined, method, undefined, url);

    const encodedUrl = encodeURIComponent(btoa(url));

    expect(result).toContain(`method=${method}`);
    expect(result).toContain(`url=${encodedUrl}`);
    expect(result).not.toContain('body=');
    expect(result).not.toContain('h_');
  });
});
