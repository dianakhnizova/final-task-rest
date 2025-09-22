import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { WrapperId } from '@/sources/enums';
import {
  GITHUB_PROJECT_URL,
  RSS_COURSE_URL,
} from '@/sources/constants/constants';
import { Footer } from '@/components/footer';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
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

vi.mock('@/components/icons', () => ({
  GithubLogo: () => <div data-testid="github-logo">GithubLogo</div>,
  RsSchoolLogo: () => <div data-testid="rsschool-logo">RsSchoolLogo</div>,
}));

vi.mock('./footer.module.css', () => ({
  default: {
    container: 'container',
    separator: 'separator',
    content: 'content',
    link: 'link',
  },
}));

describe('Footer', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });

    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'footer.githubProject': 'GitHub Project',
        'footer.rsSchoolCourse': 'RS School Course',
        'footer.copyright': '© 2024 All rights reserved',
      };
      return translations[key] || key;
    });
  });

  it('renders footer container with correct classes', () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('container');
  });

  it('renders separator element', () => {
    const { container } = render(<Footer />);

    const separator = container.querySelector('.separator');
    expect(separator).toBeInTheDocument();
  });

  it('renders Wrapper with correct props', () => {
    const { container } = render(<Footer />);

    const wrapper = container.querySelector(`#${WrapperId.footer}`);
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('content');
  });

  it('renders GitHub link with correct attributes', () => {
    render(<Footer />);

    const githubLink = screen.getByText('GitHub Project').closest('a');
    expect(githubLink).toHaveAttribute('href', GITHUB_PROJECT_URL);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveClass('link');
  });

  it('renders GitHub logo and text', () => {
    render(<Footer />);

    expect(screen.getByTestId('github-logo')).toBeInTheDocument();
    expect(screen.getByText('GitHub Project')).toBeInTheDocument();
  });

  it('renders RS School link with correct attributes', () => {
    render(<Footer />);

    const rsLink = screen.getByText('RS School Course').closest('a');
    expect(rsLink).toHaveAttribute('href', RSS_COURSE_URL);
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(rsLink).toHaveClass('link');
  });

  it('renders RS School logo and text', () => {
    render(<Footer />);

    expect(screen.getByTestId('rsschool-logo')).toBeInTheDocument();
    expect(screen.getByText('RS School Course')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);

    expect(screen.getByText('© 2024 All rights reserved')).toBeInTheDocument();
  });

  it('calls translation function with correct keys', () => {
    render(<Footer />);

    expect(mockT).toHaveBeenCalledWith('footer.githubProject');
    expect(mockT).toHaveBeenCalledWith('footer.rsSchoolCourse');
    expect(mockT).toHaveBeenCalledWith('footer.copyright');
    expect(mockT).toHaveBeenCalledTimes(3);
  });

  it('applies all CSS classes', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('.separator')).toBeInTheDocument();
    expect(container.querySelector('.content')).toBeInTheDocument();
    expect(container.querySelectorAll('.link')).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
