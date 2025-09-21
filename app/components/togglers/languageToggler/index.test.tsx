import type {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  ReactNode,
} from 'react';
import { render, screen } from '@testing-library/react';
import { useLoaderData } from 'react-router';
import { type Mock, describe, expect, it, vi } from 'vitest';
import {
  AppRoutes,
  ButtonType,
  HttpMethods,
  InputName,
  InputType,
  Language,
} from '@/sources/enums';
import { LanguageToggler } from '@/components/togglers/languageToggler';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: string;
}

interface FormProps
  extends Omit<
    FormHTMLAttributes<HTMLFormElement>,
    'children' | 'method' | 'action'
  > {
  children?: ReactNode;
  method?: string;
  action?: string;
}

vi.mock('react-router', () => ({
  Form: ({ children, method, action }: FormProps) => (
    <form method={method} action={action} data-testid="language-form">
      {children}
    </form>
  ),
  useLoaderData: vi.fn(),
}));

vi.mock('@/sources/enums', () => ({
  AppRoutes: {
    LANGUAGE: '/language',
  },
  ButtonType: {
    SUBMIT: 'submit',
  },
  HttpMethods: {
    POST: 'POST',
  },
  InputName: {
    LANGUAGE: 'language',
  },
  InputType: {
    HIDDEN: 'hidden',
  },
  Language: {
    EN: 'en',
    RU: 'ru',
  },
  Variant: {
    ICON: 'icon',
  },
}));

vi.mock('@/components/icons', () => ({
  LanguageIcon: () => <div data-testid="language-icon">LanguageIcon</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, type }: ButtonProps) => (
    <button data-variant={variant} type={type}>
      {children}
    </button>
  ),
}));

describe('LanguageToggler', () => {
  const mockUseLoaderData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLoaderData as Mock).mockImplementation(mockUseLoaderData);
  });

  it('renders form with correct attributes when current language is EN', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.EN });

    render(<LanguageToggler />);

    const form = screen.getByTestId('language-form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('method', HttpMethods.POST);
    expect(form).toHaveAttribute('action', AppRoutes.LANGUAGE);
  });

  it('renders form with correct attributes when current language is RU', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.RU });

    render(<LanguageToggler />);

    const form = screen.getByTestId('language-form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('method', HttpMethods.POST);
    expect(form).toHaveAttribute('action', AppRoutes.LANGUAGE);
  });

  it('renders hidden input with next language value when current is EN', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.EN });

    render(<LanguageToggler />);

    const hiddenInput = screen.getByDisplayValue(Language.RU);
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('type', InputType.HIDDEN);
    expect(hiddenInput).toHaveAttribute('name', InputName.LANGUAGE);
  });

  it('renders hidden input with next language value when current is RU', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.RU });

    render(<LanguageToggler />);

    const hiddenInput = screen.getByDisplayValue(Language.EN);
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('type', InputType.HIDDEN);
    expect(hiddenInput).toHaveAttribute('name', InputName.LANGUAGE);
  });

  it('renders button with correct attributes', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.EN });

    render(<LanguageToggler />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', ButtonType.SUBMIT);
  });

  it('renders LanguageIcon inside button', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.EN });

    render(<LanguageToggler />);

    const button = screen.getByRole('button');
    const languageIcon = screen.getByTestId('language-icon');

    expect(button).toContainElement(languageIcon);
    expect(languageIcon).toBeInTheDocument();
  });

  it('calculates next language correctly from EN to RU', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.EN });

    render(<LanguageToggler />);

    expect(screen.getByDisplayValue(Language.RU)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(Language.EN)).not.toBeInTheDocument();
  });

  it('calculates next language correctly from RU to EN', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.RU });

    render(<LanguageToggler />);

    expect(screen.getByDisplayValue(Language.EN)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(Language.RU)).not.toBeInTheDocument();
  });

  it('calls useLoaderData hook', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.EN });

    render(<LanguageToggler />);

    expect(useLoaderData).toHaveBeenCalledTimes(1);
  });

  it('renders without errors', () => {
    mockUseLoaderData.mockReturnValue({ locale: Language.EN });

    expect(() => render(<LanguageToggler />)).not.toThrow();
  });
});
