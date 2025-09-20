import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { DisplayName } from '@/sources/enums';
import { images as imageMessages } from '@/sources/messages/images';
import { WaitingLoader } from '@/components/ui/waitingLoader';
import styles from './waitingLoader.module.css';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('@/sources/messages/images', () => ({
  images: {
    loading: 'Loading...',
  },
}));

vi.mock('@/components/icons/loader.gif', () => ({
  default: 'loader.gif',
}));

describe('WaitingLoader', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });
    mockT.mockReturnValue('Loading, please wait...');
  });

  it('renders loader image with correct attributes', () => {
    render(<WaitingLoader />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'loader.gif');
    expect(image).toHaveAttribute('alt', imageMessages.loading);
  });

  it('renders loading text', () => {
    mockT.mockReturnValue('Please wait while loading...');

    render(<WaitingLoader />);

    const loadingText = screen.getByText('Please wait while loading...');
    expect(loadingText).toBeInTheDocument();
  });

  it('calls translation function with correct key', () => {
    render(<WaitingLoader />);

    expect(mockT).toHaveBeenCalledWith('loader.title');
    expect(mockT).toHaveBeenCalledTimes(1);
  });

  it('has correct display name', () => {
    expect(WaitingLoader.displayName).toBe(DisplayName.LOADER);
  });

  it('applies all CSS classes', () => {
    const { container } = render(<WaitingLoader />);

    expect(
      container.querySelector(`.${styles.loaderContainer}`)
    ).toBeInTheDocument();
    expect(container.querySelector(`.${styles.loader}`)).toBeInTheDocument();
    expect(container.querySelector(`.${styles.loading}`)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<WaitingLoader />);
    expect(container).toMatchSnapshot();
  });
});
