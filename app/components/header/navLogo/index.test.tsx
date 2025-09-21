import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from '@/sources/enums';
import { NavLogo } from '@/components/header/navLogo';

interface Props {
  children?: ReactNode;
  to: string;
  className?: string;
}

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('react-router', () => ({
  Link: ({ children, to, className }: Props) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('@/sources/enums', () => ({
  AppRoutes: {
    HOME: '/',
  },
}));

vi.mock('@/components/icons/', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../Header.module.css', () => ({
  default: {
    left: 'left',
    home: 'home',
  },
}));

describe('NavLogo', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });
    mockT.mockReturnValue('GraphiQL App');
  });

  it('renders container div with correct class', () => {
    const { container } = render(<NavLogo />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('left');
  });

  it('renders Link with correct attributes', () => {
    render(<NavLogo />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', AppRoutes.HOME);
    expect(link).toHaveClass('home');
  });

  it('renders Logo component', () => {
    render(<NavLogo />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders translated text', () => {
    mockT.mockReturnValue('GraphiQL Application');

    render(<NavLogo />);

    expect(screen.getByText('GraphiQL Application')).toBeInTheDocument();
  });

  it('calls translation function with correct key', () => {
    render(<NavLogo />);

    expect(mockT).toHaveBeenCalledWith('header.textForLogo');
    expect(mockT).toHaveBeenCalledTimes(1);
  });

  it('applies all CSS classes correctly', () => {
    const { container } = render(<NavLogo />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('left');

    const link = screen.getByRole('link');
    expect(link).toHaveClass('home');
  });

  it('has correct structure with logo and text', () => {
    render(<NavLogo />);

    const link = screen.getByRole('link');
    const logo = screen.getByTestId('logo');
    const text = screen.getByText('GraphiQL App');

    expect(link).toContainElement(logo);
    expect(link).toContainElement(text);
  });

  it('matches snapshot', () => {
    const { container } = render(<NavLogo />);
    expect(container).toMatchSnapshot();
  });

  it('works with different translation texts', () => {
    mockT.mockReturnValue('My Custom App Name');

    render(<NavLogo />);

    expect(screen.getByText('My Custom App Name')).toBeInTheDocument();
  });
});
