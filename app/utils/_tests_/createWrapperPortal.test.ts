import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createWrapperPortal } from '../createWrapperPortal';

describe('createWrapperPortal', () => {
  const wrapperId = 'test-wrapper';

  beforeEach(() => {
    const existing = document.getElementById(wrapperId);
    if (existing) existing.remove();
  });

  afterEach(() => {
    const existing = document.getElementById(wrapperId);
    if (existing) existing.remove();
  });

  it('creates a div with the given id and appends it to body', () => {
    const wrapper = createWrapperPortal(wrapperId);

    expect(wrapper).toBeInstanceOf(HTMLDivElement);
    expect(wrapper.id).toBe(wrapperId);
    expect(document.body.contains(wrapper)).toBe(true);
  });

  it('returns the same element that is appended to body', () => {
    const wrapper = createWrapperPortal(wrapperId);

    const bodyElement = document.getElementById(wrapperId);
    expect(wrapper).toBe(bodyElement);
  });
});
