import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslation } from 'react-i18next';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import type { KeyValue } from '@/sources/interfaces';
import { KeyValueEditor } from '@/components/keyValueEditor';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  setInput?: (value: string) => void;
}

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }: ButtonProps) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/ui/input', () => ({
  Input: ({ value, setInput, placeholder, className, id }: InputProps) => (
    <input
      id={id}
      value={value}
      onChange={e => setInput?.(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  ),
}));

vi.mock('./KeyValueEditor.module.css', () => ({
  default: {
    container: 'container',
    table: 'table',
    addButton: 'addButton',
    title: 'title',
    input: 'input',
  },
}));

describe('KeyValueEditor', () => {
  const mockT = vi.fn();
  const mockOnAdd = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnUpdate = vi.fn();

  const mockKeyValues: KeyValue[] = [
    { id: 1, key: 'Content-Type', value: 'application/json' },
    { id: 2, key: 'Authorization', value: 'Bearer token' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });

    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'keyValueEditor.add': 'Add',
        'keyValueEditor.delete': 'Delete',
        'keyValueEditor.emptyMessage': 'No items',
      };
      return translations[key] || key;
    });
  });

  it('renders table with headers and add button', () => {
    render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={[]}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('shows empty message when no keyValues provided', () => {
    render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={[]}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('No items')).toBeInTheDocument();
  });

  it('renders key-value pairs when provided', () => {
    render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={mockKeyValues}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Authorization')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bearer token')).toBeInTheDocument();
    expect(screen.getAllByText('Delete')).toHaveLength(2);
  });

  it('calls onAdd when add button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={[]}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const addButton = screen.getByText('Add');
    await user.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledWith({
      id: 1,
      key: '',
      value: '',
    });
  });

  it('calculates correct ID when adding to existing list', async () => {
    const user = userEvent.setup();
    render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={mockKeyValues}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const addButton = screen.getByText('Add');
    await user.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledWith({
      id: 3,
      key: '',
      value: '',
    });
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={mockKeyValues}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('applies CSS classes correctly', () => {
    const { container } = render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={mockKeyValues}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('.table')).toBeInTheDocument();
    expect(container.querySelector('.addButton')).toBeInTheDocument();
    expect(container.querySelectorAll('.input')).toHaveLength(4);
  });

  it('calls translation function with correct keys', () => {
    render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={[]}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(mockT).toHaveBeenCalledWith('keyValueEditor.add');
    expect(mockT).toHaveBeenCalledWith('keyValueEditor.emptyMessage');
  });

  it('matches snapshot with empty list', () => {
    const { container } = render(
      <KeyValueEditor
        keyHeader="Key"
        valueHeader="Value"
        keyValues={[]}
        onAdd={mockOnAdd}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
