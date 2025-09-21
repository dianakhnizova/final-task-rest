import { authReducer } from '@/store/slices/auth/auth.slice';
import { restClientReducer } from '@/store/slices/restClient/restClient.slice';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { vi } from 'vitest';
import SignInPage from '.';

vi.mock('@/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

describe('SignInPage', () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      restClient: restClientReducer,
    },
  });

  it('renders email and password fields and submit button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignInPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/placeholder.email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/placeholder.password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /buttons.signIn/i })
    ).toBeInTheDocument();
  });
});
