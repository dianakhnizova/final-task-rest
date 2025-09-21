import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Headers } from '.';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/utils/hooks/useActions', () => ({
  useActions: () => ({
    addHeader: vi.fn(),
    updateHeader: vi.fn(),
    removeHeader: vi.fn(),
  }),
}));

vi.mock('react-redux', () => ({
  useSelector: <T,>(selector: (state: unknown) => T): T => {
    if (selector.name === 'selectHeaders') {
      return [{ id: 1, key: 'Content-Type', value: 'application/json' }] as T;
    }
    return [] as unknown as T;
  },
}));

describe('Headers', () => {
  it('renders KeyValueEditor with headers', () => {
    render(<Headers />);

    expect(screen.getByText('table.headerKey')).toBeInTheDocument();
    expect(screen.getByText('table.headerValue')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('keyValueEditor.keyPlaceholder')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('keyValueEditor.valuePlaceholder')
    ).toBeInTheDocument();
  });
});
