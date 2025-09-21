import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from '@/sources/enums';
import { SignInUpLinks } from '@/components/signInUpLinks';

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
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
  },
}));

vi.mock('./SignInUpLinks.module.css', () => ({
  default: {
    container: 'container',
    link: 'link',
  },
}));

describe('SignInUpLinks', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });

    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'buttons.signIn': 'Sign In',
        'buttons.signUp': 'Sign Up',
      };
      return translations[key] || key;
    });
  });

  it('renders container with correct class', () => {
    const { container } = render(<SignInUpLinks />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('container');
  });

  it('renders sign in link with correct attributes', () => {
    render(<SignInUpLinks />);

    const signInLink = screen.getByText('Sign In');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', AppRoutes.SIGN_IN);
    expect(signInLink).toHaveClass('link');
  });

  it('renders sign up link with correct attributes', () => {
    render(<SignInUpLinks />);

    const signUpLink = screen.getByText('Sign Up');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', AppRoutes.SIGN_UP);
    expect(signUpLink).toHaveClass('link');
  });

  it('calls translation function with correct keys', () => {
    render(<SignInUpLinks />);

    expect(mockT).toHaveBeenCalledWith('buttons.signIn');
    expect(mockT).toHaveBeenCalledWith('buttons.signUp');
    expect(mockT).toHaveBeenCalledTimes(2);
  });

  it('applies all CSS classes correctly', () => {
    const { container } = render(<SignInUpLinks />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('container');

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('link');
    });
  });

  it('renders both links in correct order', () => {
    render(<SignInUpLinks />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveTextContent('Sign In');
    expect(links[0]).toHaveAttribute('href', AppRoutes.SIGN_IN);

    expect(links[1]).toHaveTextContent('Sign Up');
    expect(links[1]).toHaveAttribute('href', AppRoutes.SIGN_UP);
  });

  it('works with different translation texts', () => {
    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'buttons.signIn': 'Войти',
        'buttons.signUp': 'Регистрация',
      };
      return translations[key] || key;
    });

    render(<SignInUpLinks />);

    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<SignInUpLinks />);
    expect(container).toMatchSnapshot();
  });

  it('renders without errors', () => {
    expect(() => render(<SignInUpLinks />)).not.toThrow();
  });
});
