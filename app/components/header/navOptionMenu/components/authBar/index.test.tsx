import { supabase } from '@/supabaseClient';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes, LS_KEY } from '@/sources/enums';
import {
  TOAST_DURATION,
  TOAST_DURATION_LONG,
} from '@/sources/constants/constants';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { AuthBar } from '@/components/header/navOptionMenu/components/authBar';
import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
  },
}));

vi.mock('@/store/slices/auth/selectors', () => ({
  selectAuth: vi.fn(),
}));

vi.mock('@/store/slices/settings/settingsLS', () => ({
  clearSettingsLS: vi.fn(),
}));

vi.mock('@/supabaseClient', () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('@/utils/hooks/useActions', () => ({
  useActions: vi.fn(),
}));

vi.mock('@/utils/hooks/useSaveUserToLS', () => ({
  useSaveUserToLS: vi.fn(),
}));

describe('AuthBar', () => {
  const mockUseSelector = vi.fn();
  const mockNavigate = vi.fn();
  const mockT = vi.fn();
  const mockToastSuccess = vi.fn();
  const mockSupabaseSignOut = vi.fn();
  const mockClearUser = vi.fn();
  const mockRemoveUserFromStorage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useSelector as unknown as Mock).mockImplementation(mockUseSelector);
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useTranslation as Mock).mockReturnValue({ t: mockT });
    (toast.success as Mock) = mockToastSuccess;
    (supabase.auth.signOut as Mock) = mockSupabaseSignOut;
    (useActions as Mock).mockReturnValue({ clearUser: mockClearUser });
    (useSaveUserToLS as Mock).mockReturnValue({
      removeUserFromStorage: mockRemoveUserFromStorage,
    });

    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'buttons.logOut': 'Log Out',
        'buttons.signIn': 'Sign In',
        'buttons.signUp': 'Sign Up',
      };
      return translations[key] || key;
    });

    mockSupabaseSignOut.mockResolvedValue(undefined);
  });

  it('renders sign in button when user is not authenticated', () => {
    mockUseSelector.mockReturnValue(null);

    render(<AuthBar />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
  });

  it('renders log out button when user is authenticated', () => {
    const mockUser = {
      user_metadata: { name: 'John Doe' },
      email: 'john@example.com',
    };
    mockUseSelector.mockReturnValue(mockUser);

    render(<AuthBar />);

    expect(screen.getByText('Log Out')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  it('navigates to sign in page when sign in button is clicked', async () => {
    const user = userEvent.setup();
    mockUseSelector.mockReturnValue(null);

    render(<AuthBar />);

    const signInButton = screen.getByText('Sign In');
    await user.click(signInButton);

    expect(mockNavigate).toHaveBeenCalledWith(AppRoutes.SIGN_IN);
  });

  it('calls translation function with correct keys', () => {
    mockUseSelector.mockReturnValue(null);
    render(<AuthBar />);

    expect(mockT).toHaveBeenCalledWith('buttons.signIn');

    mockUseSelector.mockReturnValue({ user_metadata: { name: 'Test' } });
    render(<AuthBar />);

    expect(mockT).toHaveBeenCalledWith('buttons.logOut');
  });

  it('uses correct LS_KEY for user storage', () => {
    mockUseSelector.mockReturnValue(null);
    render(<AuthBar />);

    expect(useSaveUserToLS).toHaveBeenCalledWith(LS_KEY.USER, null);
  });

  it('matches snapshot for authenticated user', () => {
    const mockUser = {
      user_metadata: { name: 'John Doe' },
      email: 'john@example.com',
    };
    mockUseSelector.mockReturnValue(mockUser);

    const { container } = render(<AuthBar />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for unauthenticated user', () => {
    mockUseSelector.mockReturnValue(null);

    const { container } = render(<AuthBar />);
    expect(container).toMatchSnapshot();
  });
});

describe('AuthBar constants', () => {
  it('uses correct toast messages', () => {
    expect('Disconnect a user from the system...').toBeDefined();
    expect(toastMessages.logOut).toBeDefined();
    expect(toastMessages.logOutId).toBeDefined();
  });

  it('uses correct toast durations', () => {
    expect(TOAST_DURATION).toBeDefined();
    expect(TOAST_DURATION_LONG).toBeDefined();
  });

  it('uses correct app routes', () => {
    expect(AppRoutes.SIGN_IN).toBeDefined();
    expect(AppRoutes.HOME).toBeDefined();
  });
});
