import { selectVariables } from '@/store/slices/settings/selectors';
import { type TypeRootState, store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, vi } from 'vitest';
import VariablesPage from '..';

vi.mock('@/components/keyValueEditor', () => ({
  KeyValueEditor: vi.fn(() => <div data-testid="key-value-editor" />),
}));

vi.mock('@/utils/hooks/useActions', () => ({
  useActions: () => ({
    addVariable: vi.fn(),
    updateVariable: vi.fn(),
    removeVariable: vi.fn(),
  }),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: (selector: (state: TypeRootState) => unknown) => {
      if (selector === selectVariables) {
        return [{ key: 'test', value: '123' }];
      }
      return undefined;
    },
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('VariablesPage', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <VariablesPage />
      </Provider>
    );

    expect(screen.getByText('variablesPage.header')).toBeInTheDocument();

    expect(screen.getByTestId('key-value-editor')).toBeInTheDocument();
  });
});
