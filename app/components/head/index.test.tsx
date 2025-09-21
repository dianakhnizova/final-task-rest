import { render } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { Head } from '@/components/head';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('react-router', () => ({
  Meta: () => <div data-testid="meta" />,
  Links: () => <div data-testid="links" />,
}));

vi.mock('@/sources/constants/constants', () => ({
  LOGO_URL: '/logo.png',
}));

describe('Head', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });
    mockT.mockReturnValue('My App Title');
  });

  it('calls translation function with correct key', () => {
    render(<Head />);

    expect(mockT).toHaveBeenCalledWith('root.appTitle');
    expect(mockT).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(<Head />);
    expect(container).toMatchSnapshot();
  });
});
