import { describe, expect, it } from 'vitest';
import { interpolate } from '../interpolate';

describe('interpolate', () => {
  it('replaces template keys with values', () => {
    const template = new Map([
      ['name', 'Alice'],
      ['age', '30'],
    ]);

    const str = 'My name is {{name}} and I am {{age}} years old.';
    const result = interpolate(str, template);

    expect(result).toBe('My name is Alice and I am 30 years old.');
  });

  it('replaces multiple occurrences of the same key', () => {
    const template = new Map([['word', 'echo']]);
    const str = '{{word}}! {{word}}!';
    const result = interpolate(str, template);

    expect(result).toBe('echo! echo!');
  });

  it('does not modify string if key is not found in template', () => {
    const template = new Map([['foo', 'bar']]);
    const str = 'Hello {{name}}';
    const result = interpolate(str, template);

    expect(result).toBe('Hello {{name}}');
  });

  it('handles empty template', () => {
    const template = new Map();
    const str = 'Nothing changes';
    const result = interpolate(str, template);

    expect(result).toBe('Nothing changes');
  });
});
