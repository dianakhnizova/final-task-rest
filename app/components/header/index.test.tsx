import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { WrapperId } from '@/sources/enums';
import { Header } from '@/components/header';
import useInView from '@/utils/hooks/useInView';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('clsx', () => ({
  clsx: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' '),
}));

interface Props {
  children?: ReactNode;
  id?: string;
  className?: string;
}

vi.mock('@/components/wrapper', () => ({
  default: ({ children, id, className }: Props) => (
    <div id={id} className={className}>
      {children}
    </div>
  ),
}));

vi.mock('@/utils/hooks/useInView', () => ({
  default: vi.fn(),
}));

vi.mock('./navLogo', () => ({
  NavLogo: () => <div data-testid="nav-logo">NavLogo</div>,
}));

vi.mock('./navOptionMenu', () => ({
  NavOptionMenu: () => <div data-testid="nav-option-menu">NavOptionMenu</div>,
}));

vi.mock('./header.module.css', () => ({
  default: {
    banner: 'banner',
    header: 'header',
    stuck: 'stuck',
  },
}));

describe('Header', () => {
  const mockT = vi.fn();
  const mockUseInView = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });
    (useInView as Mock).mockImplementation(mockUseInView);

    mockT.mockReturnValue('Welcome Banner Text');
    mockUseInView.mockReturnValue([{ current: null }, true]);
  });

  it('renders banner with translated text', () => {
    mockT.mockReturnValue('Special Promotion Banner');

    render(<Header />);

    const banner = screen.getByText('Special Promotion Banner');
    expect(banner).toBeInTheDocument();
    expect(banner.tagName).toBe('H3');
  });

  it('renders trigger ref element', () => {
    const { container } = render(<Header />);

    const triggerDiv = container.querySelector('div');
    expect(triggerDiv).toBeInTheDocument();
  });

  it('renders header with correct classes when in view', () => {
    mockUseInView.mockReturnValue([{ current: null }, true]);

    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('header');
    expect(header).not.toHaveClass('stuck');
  });

  it('renders header with stuck class when not in view', () => {
    mockUseInView.mockReturnValue([{ current: null }, false]);

    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('header');
    expect(header).toHaveClass('stuck');
  });

  it('renders Wrapper with correct props', () => {
    render(<Header />);

    const wrapper = document.getElementById(WrapperId.header);
    expect(wrapper).toBeInTheDocument();
  });

  it('renders inner section with correct classes when in view', () => {
    mockUseInView.mockReturnValue([{ current: null }, true]);

    const { container } = render(<Header />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('header');
    expect(section).toHaveClass('stuck');
  });

  it('renders inner section without stuck class when not in view', () => {
    mockUseInView.mockReturnValue([{ current: null }, false]);

    const { container } = render(<Header />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('header');
    expect(section).not.toHaveClass('stuck');
  });

  it('renders NavLogo component', () => {
    render(<Header />);

    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
  });

  it('renders NavOptionMenu component', () => {
    render(<Header />);

    expect(screen.getByTestId('nav-option-menu')).toBeInTheDocument();
  });

  it('calls useInView hook', () => {
    render(<Header />);

    expect(useInView).toHaveBeenCalled();
  });

  it('calls translation function with correct key', () => {
    render(<Header />);

    expect(mockT).toHaveBeenCalledWith('header.banner');
    expect(mockT).toHaveBeenCalledTimes(1);
  });

  it('applies all CSS classes correctly', () => {
    mockUseInView.mockReturnValue([{ current: null }, false]);

    const { container } = render(<Header />);

    expect(container.querySelector('.banner')).toBeInTheDocument();

    const header = container.querySelector('header');
    expect(header).toHaveClass('header stuck');

    const section = container.querySelector('section');
    expect(section).toHaveClass('header');
  });

  it('matches snapshot when in view', () => {
    mockUseInView.mockReturnValue([{ current: null }, true]);

    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when not in view', () => {
    mockUseInView.mockReturnValue([{ current: null }, false]);

    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('handles useInView returning null ref', () => {
    mockUseInView.mockReturnValue([null, true]);

    const { container } = render(<Header />);

    expect(container.querySelector('header')).toBeInTheDocument();
  });
});
