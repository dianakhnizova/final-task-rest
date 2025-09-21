import {
  initialState as restClientInitialState,
  restClientReducer,
} from '@/store/slices/restClient/restClient.slice';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { BodyEditor } from '..';

const mockSetBody = vi.fn();
vi.mock('@/utils/hooks/useActions', () => ({
  useActions: () => ({ setBody: mockSetBody }),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const renderWithStore = (stateOverrides = {}) => {
  const store = configureStore({
    reducer: { restClient: restClientReducer },
    preloadedState: {
      restClient: { ...restClientInitialState, ...stateOverrides },
    },
  });

  return render(
    <Provider store={store}>
      <BodyEditor />
    </Provider>
  );
};

describe('BodyEditor', () => {
  beforeEach(() => {
    mockSetBody.mockReset();
  });

  it('renders editor for POST method', () => {
    renderWithStore({ method: 'POST', body: '' });

    expect(screen.getByText('bodyEditor.bodyTitle')).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('does not render editor for GET method', () => {
    renderWithStore({ method: 'GET', body: '' });

    expect(screen.queryByText('bodyEditor.bodyTitle')).not.toBeInTheDocument();
  });

  it('calls setBody on change', () => {
    renderWithStore({ method: 'POST', body: '' });

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '{"foo": "bar"}' } });

    expect(mockSetBody).toHaveBeenCalledWith('{"foo": "bar"}');
  });
});
