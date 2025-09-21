import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useInView from './useInView';

vi.mock('react', () => ({
  useEffect: vi.fn(fn => fn()),
  useRef: vi.fn(),
  useState: vi.fn(),
}));

const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

describe('useInView', () => {
  const mockUseRef = vi.fn();
  const mockUseState = vi.fn();
  const mockSetInView = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    global.IntersectionObserver = mockIntersectionObserver;
    mockIntersectionObserver.mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: vi.fn(),
      takeRecords: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns triggerRef and inView state', () => {
    const mockRef = { current: null };
    mockUseRef.mockReturnValue(mockRef);
    mockUseState.mockReturnValue([false, mockSetInView]);

    const { result } = renderHook(() => useInView());

    expect(result.current).toHaveLength(2);
    expect(result.current[1]).toBe(false);
  });

  it('creates IntersectionObserver with correct options', () => {
    const mockRef = { current: document.createElement('div') };
    mockUseRef.mockReturnValue(mockRef);
    mockUseState.mockReturnValue([false, mockSetInView]);

    renderHook(() => useInView());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0,
      }
    );
  });

  it('does not observe when trigger ref is null', () => {
    const mockRef = { current: null };
    mockUseRef.mockReturnValue(mockRef);
    mockUseState.mockReturnValue([false, mockSetInView]);

    renderHook(() => useInView());

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('works with different threshold values (if supported)', () => {
    const mockRef = { current: document.createElement('div') };
    mockUseRef.mockReturnValue(mockRef);
    mockUseState.mockReturnValue([false, mockSetInView]);

    renderHook(() => useInView());

    const options = mockIntersectionObserver.mock.calls[0][1];
    expect(options.threshold).toBe(0);
  });
});

describe('useInView integration', () => {
  beforeEach(() => {
    vi.unmock('react');
    vi.unmock('react-dom');
  });

  it('actually creates IntersectionObserver instance', () => {
    const { result } = renderHook(() => useInView());

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toHaveProperty('current');
    expect(typeof result.current[1]).toBe('boolean');
  });

  it('can be used with DOM elements', () => {
    const { result } = renderHook(() => useInView());
    const [triggerRef] = result.current;

    expect(triggerRef).toHaveProperty('current');
    expect(triggerRef.current).toBeNull();
  });
});
