import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Modal } from '@/components/ui/modal';
import styles from './Modal.module.css';

vi.mock('@/components/reactPortal/ReactPortal', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/utils/hooks/useEscapeKey', () => ({
  useEscapeKey: vi.fn(),
}));

vi.mock('@/sources/messages/images', () => ({
  images: {
    close: 'Close icon',
  },
}));

describe('Modal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(document.body, 'style', {
      value: {
        overflow: '',
      },
      writable: true,
    });
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        Modal Content
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div data-testid="custom-content">Custom Content</div>
      </Modal>
    );

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('applies correct variant to close button', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    expect(closeButton.className).toMatch(/icon/);
  });

  it('renders close icon with correct alt text', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>
    );

    const image = screen.getByAltText('Close icon');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'close.svg');
  });

  it('applies CSS classes to elements', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>
    );

    expect(container.querySelector(`.${styles.overlay}`)).toBeInTheDocument();
    expect(container.querySelector(`.${styles.container}`)).toBeInTheDocument();
    expect(
      container.querySelector(`.${styles.closeButton}`)
    ).toBeInTheDocument();
    expect(container.querySelector(`.${styles.image}`)).toBeInTheDocument();
  });

  it('sets body overflow to hidden when modal opens', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when modal closes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={mockOnClose}>
        Content
      </Modal>
    );

    expect(document.body.style.overflow).toBe('');
  });
});
