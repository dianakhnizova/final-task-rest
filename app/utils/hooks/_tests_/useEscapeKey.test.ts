import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEscapeKey } from '../useEscapeKey';

describe('useEscapeKey', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('adds keydown listener when active is true', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape, true));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('does not add keydown listener when active is false', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape, false));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('removes keydown listener on cleanup', () => {
    const onEscape = vi.fn();
    const { unmount } = renderHook(() => useEscapeKey(onEscape));

    const handler = addEventListenerSpy.mock.calls[0][1];
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', handler);
  });
});
