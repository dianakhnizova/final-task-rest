import { authActions } from '@/store/slices/auth/auth.slice';
import { store } from '@/store/store';
import type { User } from '@supabase/supabase-js';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { vi } from 'vitest';
import MainPage from '.';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/components/navigation', () => ({
  Navigation: () => <div>Navigation Component</div>,
}));
vi.mock('@/components/signInUpLinks', () => ({
  SignInUpLinks: () => <div>SignInUpLinks Component</div>,
}));
vi.mock('@/components/aboutUs', () => ({
  AboutUs: () => <div>AboutUs Component</div>,
}));

describe('MainPage', () => {
  beforeEach(() => {
    store.dispatch(authActions.clearUser());
  });

  const renderWithProvider = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

  it('renders unauthenticated view', () => {
    renderWithProvider();

    expect(screen.getByText('mainPage.welcomeNew')).toBeInTheDocument();
    expect(screen.getByText('SignInUpLinks Component')).toBeInTheDocument();
    expect(screen.getByText('AboutUs Component')).toBeInTheDocument();
  });

  it('renders authenticated view', () => {
    const mockUser = {
      user: {
        id: '1',
        email: 'diana@test.com',
        user_metadata: { name: 'Diana' },
      } as unknown as User,
      accessToken: 'token',
      expiresAt: null,
    };

    store.dispatch(authActions.setUser(mockUser));

    renderWithProvider();

    expect(screen.getByText('mainPage.welcomeOld')).toBeInTheDocument();
    expect(screen.getByText('Diana')).toBeInTheDocument();
    expect(screen.getByText('Navigation Component')).toBeInTheDocument();
    expect(screen.getByText('AboutUs Component')).toBeInTheDocument();
    expect(screen.getByText('mainPage.mainPage')).toBeInTheDocument();
  });
});
