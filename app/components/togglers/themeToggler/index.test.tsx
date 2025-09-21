import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { Variant } from '@/sources/enums';
import { ThemeToggler } from '@/components/togglers/themeToggler';
import { useTheme } from '@/utils/hooks/useTheme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: string;
}

vi.mock('@/sources/enums', () => ({
  Variant: {
    ICON: 'icon',
  },
}));

vi.mock('@/components/icons', () => ({
  SunIcon: () => <div data-testid="sun-icon">SunIcon</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant }: ButtonProps) => (
    <button onClick={onClick} data-variant={variant}>
      {children}
    </button>
  ),
}));

vi.mock('@/utils/hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggler', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTheme as Mock).mockReturnValue({
      toggleTheme: mockToggleTheme,
    });
  });

  it('renders button with SunIcon', () => {
    render(<ThemeToggler />);

    const button = screen.getByRole('button');
    const sunIcon = screen.getByTestId('sun-icon');

    expect(button).toBeInTheDocument();
    expect(sunIcon).toBeInTheDocument();
    expect(button).toContainElement(sunIcon);
  });

  it('applies correct variant to button', () => {
    render(<ThemeToggler />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', Variant.ICON);
  });

  it('calls toggleTheme when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggler />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('calls useTheme hook', () => {
    render(<ThemeToggler />);

    expect(useTheme).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(<ThemeToggler />);
    expect(container).toMatchSnapshot();
  });

  it('renders without errors', () => {
    expect(() => render(<ThemeToggler />)).not.toThrow();
  });

  it('handles multiple clicks correctly', async () => {
    const user = userEvent.setup();
    render(<ThemeToggler />);

    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(3);
  });
});
