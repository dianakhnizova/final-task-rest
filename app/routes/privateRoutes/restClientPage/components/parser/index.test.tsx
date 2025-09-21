import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Parser } from '.';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockSetParser = vi.fn();
vi.mock('@/utils/hooks/useActions', () => ({
  useActions: () => ({
    setParser: mockSetParser,
  }),
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({
    setSelectedValue,
  }: {
    setSelectedValue: (value: string) => void;
  }) => <button onClick={() => setSelectedValue('JSON')}>Select JSON</button>,
}));

describe('Parser', () => {
  beforeEach(() => {
    mockSetParser.mockClear();
  });

  it('renders Parser component', () => {
    render(<Parser />);
    expect(screen.getByText('response.selectParser')).toBeInTheDocument();
    expect(screen.getByText('Select JSON')).toBeInTheDocument();
  });

  it('calls setParser when a parser is selected', () => {
    render(<Parser />);
    fireEvent.click(screen.getByText('Select JSON'));
    expect(mockSetParser).toHaveBeenCalledWith('JSON');
  });
});
