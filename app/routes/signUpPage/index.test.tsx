import { authReducer } from '@/store/slices/auth/auth.slice';
import { restClientReducer } from '@/store/slices/restClient/restClient.slice';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { vi } from 'vitest';
import SignUpPage from '.';

// Мокаем supabase
vi.mock('@/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
  },
}));

describe('SignUpPage', () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      restClient: restClientReducer,
    },
  });

  it('renders all input fields and submit button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/placeholder.email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/placeholder.name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/placeholder.password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/placeholder.confirmPassword/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /buttons.signUp/i })
    ).toBeInTheDocument();
  });
});
