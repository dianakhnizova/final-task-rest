import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UseFormRegister } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '@/components/ui/input';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('clsx', () => ({
  default: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' '),
}));

describe('Input', () => {
  const mockRegister = vi.fn();
  const mockSetInput = vi.fn();
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockRegister.mockReturnValue({
      onChange: mockOnChange,
      onBlur: vi.fn(),
      ref: vi.fn(),
      name: 'testField',
    });
  });

  it('renders input with label', () => {
    render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        name="testField"
        register={
          mockRegister as unknown as UseFormRegister<{ testField: string }>
        }
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders input without label', () => {
    render(
      <Input<{ testField: string }>
        id="test-input"
        name="testField"
        register={
          mockRegister as unknown as UseFormRegister<{ testField: string }>
        }
      />
    );

    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies correct id and htmlFor attributes', () => {
    render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        name="testField"
        register={
          mockRegister as unknown as UseFormRegister<{ testField: string }>
        }
      />
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test Label');

    expect(input).toHaveAttribute('id', 'test-input');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('calls setInput and register onChange when input changes', async () => {
    const user = userEvent.setup();

    render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        name="testField"
        setInput={mockSetInput}
        register={
          mockRegister as unknown as UseFormRegister<{ testField: string }>
        }
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');

    expect(mockSetInput).toHaveBeenCalledWith('test value');
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls only setInput when register is not provided', async () => {
    const user = userEvent.setup();

    render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        setInput={mockSetInput}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');

    expect(mockSetInput).toHaveBeenCalledWith('test value');
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('calls only register onChange when setInput is not provided', async () => {
    const user = userEvent.setup();

    render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        name="testField"
        register={
          mockRegister as unknown as UseFormRegister<{ testField: string }>
        }
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');

    expect(mockSetInput).not.toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('applies custom container className', () => {
    const { container } = render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        name="testField"
        containerClassName="custom-container"
        register={
          mockRegister as unknown as UseFormRegister<{ testField: string }>
        }
      />
    );

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('custom-container');
  });

  it('passes additional input attributes', () => {
    render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        name="testField"
        type="email"
        placeholder="Enter email"
        disabled
        register={
          mockRegister as unknown as UseFormRegister<{ testField: string }>
        }
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toBeDisabled();
  });

  it('works without register and name props', () => {
    render(
      <Input<{ testField: string }>
        id="test-input"
        label="Test Label"
        setInput={mockSetInput}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
