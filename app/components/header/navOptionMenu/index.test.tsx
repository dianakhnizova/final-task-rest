import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavOptionMenu } from '@/components/header/navOptionMenu';

vi.mock('@/components/togglers/languageToggler', () => ({
  LanguageToggler: () => (
    <div data-testid="language-toggler">LanguageToggler</div>
  ),
}));

vi.mock('@/components/togglers/themeToggler', () => ({
  ThemeToggler: () => <div data-testid="theme-toggler">ThemeToggler</div>,
}));

vi.mock('./components/authBar', () => ({
  AuthBar: () => <div data-testid="auth-bar">AuthBar</div>,
}));

vi.mock('../header.module.css', () => ({
  default: {
    right: 'right',
  },
}));

describe('NavOptionMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders container div with correct class', () => {
    const { container } = render(<NavOptionMenu />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('right');
  });

  it('renders LanguageToggler component', () => {
    render(<NavOptionMenu />);

    expect(screen.getByTestId('language-toggler')).toBeInTheDocument();
  });

  it('renders ThemeToggler component', () => {
    render(<NavOptionMenu />);

    expect(screen.getByTestId('theme-toggler')).toBeInTheDocument();
  });

  it('renders AuthBar component', () => {
    render(<NavOptionMenu />);

    expect(screen.getByTestId('auth-bar')).toBeInTheDocument();
  });

  it('renders all components in correct order', () => {
    const { container } = render(<NavOptionMenu />);

    const containerDiv = container.firstChild;
    const children = containerDiv?.childNodes;

    expect(children).toHaveLength(3);

    const firstChild = children?.[0] as HTMLElement;
    const secondChild = children?.[1] as HTMLElement;
    const thirdChild = children?.[2] as HTMLElement;

    expect(firstChild.getAttribute('data-testid')).toBe('language-toggler');
    expect(secondChild.getAttribute('data-testid')).toBe('theme-toggler');
    expect(thirdChild.getAttribute('data-testid')).toBe('auth-bar');
  });

  it('applies CSS class correctly', () => {
    const { container } = render(<NavOptionMenu />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('right');
  });

  it('matches snapshot', () => {
    const { container } = render(<NavOptionMenu />);
    expect(container).toMatchSnapshot();
  });

  it('renders without errors when all components are present', () => {
    expect(() => render(<NavOptionMenu />)).not.toThrow();
  });
});
