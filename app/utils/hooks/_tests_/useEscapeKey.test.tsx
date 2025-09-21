import { useEffect } from 'react';
import { renderHook } from '@testing-library/react';
import {
  type Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { useEscapeKey } from '../useEscapeKey';

vi.mock('react', () => ({
  useEffect: vi.fn(fn => fn()),
}));

describe('useEscapeKey', () => {
  const mockAddEventListener = vi.fn();
  const mockRemoveEventListener = vi.fn();
  const mockUseEffect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(document, 'addEventListener', {
      value: mockAddEventListener,
      writable: true,
    });

    Object.defineProperty(document, 'removeEventListener', {
      value: mockRemoveEventListener,
      writable: true,
    });

    (useEffect as Mock).mockImplementation(mockUseEffect);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls useEffect hook', () => {
    const onEscape = vi.fn();

    renderHook(() => useEscapeKey(onEscape));

    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
      onEscape,
      true,
    ]);
  });

  it('does not add event listener when active is false', () => {
    const onEscape = vi.fn();

    renderHook(() => useEscapeKey(onEscape, false));

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });

  it('removes event listener on cleanup', () => {
    const onEscape = vi.fn();

    mockUseEffect.mockImplementation(fn => {
      const cleanup = fn();
      return cleanup;
    });

    renderHook(() => useEscapeKey(onEscape));

    const cleanup = mockUseEffect.mock.results[0].value;
    cleanup();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('handles event listener removal correctly', () => {
    const onEscape = vi.fn();
    let cleanupFn: () => void;

    mockUseEffect.mockImplementation(fn => {
      cleanupFn = fn();
      return cleanupFn;
    });

    renderHook(() => useEscapeKey(onEscape));

    const eventHandler = mockAddEventListener.mock.calls[0][1];

    cleanupFn!();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'keydown',
      eventHandler
    );
  });
});
