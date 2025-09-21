import { render, screen } from '@testing-library/react';
import {
  GithubLogo,
  LanguageIcon,
  Logo,
  RsSchoolLogo,
  SunIcon,
} from '../index';

describe('Icons exports', () => {
  it('renders GithubLogo without crashing', () => {
    render(<GithubLogo />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders Logo without crashing', () => {
    render(<Logo />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders RsSchoolLogo without crashing', () => {
    render(<RsSchoolLogo />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders LanguageIcon without crashing', () => {
    render(<LanguageIcon />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders SunIcon without crashing', () => {
    render(<SunIcon />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
