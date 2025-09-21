import { describe, expect, it } from 'vitest';
import { type PageMeta, pageMeta } from '../metaHelpers';

describe('pageMeta', () => {
  it('should return a function that returns correct meta array', () => {
    const metaData: PageMeta = {
      metaTitle: 'Test Title',
      metaName: 'description',
      metaContent: 'This is a test description',
    };

    const getMeta = pageMeta(metaData);
    const result = getMeta();

    expect(result).toEqual([
      { title: 'Test Title' },
      { name: 'description', content: 'This is a test description' },
    ]);
  });
});
