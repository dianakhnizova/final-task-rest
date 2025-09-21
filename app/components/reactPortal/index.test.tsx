import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DisplayName } from '@/sources/enums';
import { ReactPortal } from './ReactPortal';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: vi.fn(),
    useState: vi.fn(),
  };
});

vi.mock('react-dom', () => ({
  createPortal: vi.fn((children, element) => (
    <div data-testid="portal" data-element={element?.id}>
      {children}
    </div>
  )),
}));

vi.mock('@/sources/enums', () => ({
  DisplayName: {
    PORTAL: 'Portal',
  },
}));

vi.mock('@/sources/constants/constants', () => ({
  WRAPPER_ROOT_PORTAL_ID: 'root-portal',
}));

vi.mock('@/utils/createWrapperPortal', () => ({
  createWrapperPortal: vi.fn(),
}));

describe('ReactPortal', () => {
  const mockUseEffect = vi.fn();
  const mockUseState = vi.fn();
  const mockCreateWrapperPortal = vi.fn();

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('has correct display name', () => {
    expect(ReactPortal.displayName).toBe(DisplayName.PORTAL);
  });

  it('returns null when wrapper element is not ready', () => {
    mockUseState.mockReturnValueOnce([null, vi.fn()]);

    const { container } = render(
      <ReactPortal>
        <div>Test Content</div>
      </ReactPortal>
    );

    expect(container.firstChild).toBeNull();
  });

  it('finds existing element when it exists in document', () => {
    const existingElement = document.createElement('div');
    existingElement.id = 'existing-portal';
    document.body.appendChild(existingElement);

    mockUseState
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([existingElement, vi.fn()]);
    mockUseEffect.mockImplementation(callback => callback());

    render(
      <ReactPortal wrapperId="existing-portal">
        <div>Test Content</div>
      </ReactPortal>
    );

    expect(mockCreateWrapperPortal).not.toHaveBeenCalled();
  });
});

describe('ReactPortal integration', () => {
  beforeEach(() => {
    vi.unmock('react');
    vi.unmock('react-dom');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('reuses existing portal element', async () => {
    const portalId = 'reuse-test-portal';
    const existingElement = document.createElement('div');
    existingElement.id = portalId;
    document.body.appendChild(existingElement);

    render(
      <ReactPortal wrapperId={portalId}>
        <div>Reuse Test</div>
      </ReactPortal>
    );

    await waitFor(() => {
      const portalElement = document.getElementById(portalId);
      expect(portalElement).toBe(existingElement);
    });
  });
});
