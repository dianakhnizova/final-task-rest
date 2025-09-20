import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select } from '@/components/ui/select';

vi.mock('./Select.module.css', () => ({
  default: {
    select: 'select',
    option: 'option',
  },
}));

describe('Select', () => {
  const mockSetSelectedValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders select element with options', () => {
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select setSelectedValue={mockSetSelectedValue} options={options} />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('renders numeric options', () => {
    const options = [1, 2, 3];

    render(
      <Select setSelectedValue={mockSetSelectedValue} options={options} />
    );

    options.forEach(option => {
      expect(screen.getByText(option.toString())).toBeInTheDocument();
    });
  });

  it('calls setSelectedValue when option is selected', async () => {
    const user = userEvent.setup();
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select setSelectedValue={mockSetSelectedValue} options={options} />
    );

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option2');

    expect(mockSetSelectedValue).toHaveBeenCalledWith('option2');
    expect(mockSetSelectedValue).toHaveBeenCalledTimes(1);
  });

  it('renders default value option when provided', () => {
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select
        setSelectedValue={mockSetSelectedValue}
        options={options}
        defaultValue="Choose an option"
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
    expect(screen.getByText('Choose an option')).toHaveValue('');
  });

  it('does not render default value option when not provided', () => {
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select setSelectedValue={mockSetSelectedValue} options={options} />
    );

    const optionsWithEmptyValue = screen
      .getAllByRole('option')
      .filter(option => option.getAttribute('value') === '');

    expect(optionsWithEmptyValue).toHaveLength(0);
  });

  it('sets default value attribute on select', () => {
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select
        setSelectedValue={mockSetSelectedValue}
        options={options}
        defaultValue="option2"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('renders correct number of options', () => {
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select setSelectedValue={mockSetSelectedValue} options={options} />
    );

    const optionElements = screen.getAllByRole('option');
    expect(optionElements).toHaveLength(options.length);
  });

  it('renders correct number of options with defaultValue', () => {
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select
        setSelectedValue={mockSetSelectedValue}
        options={options}
        defaultValue="Choose"
      />
    );

    const optionElements = screen.getAllByRole('option');
    expect(optionElements).toHaveLength(options.length + 1);
  });

  it('handles empty options array', () => {
    render(<Select setSelectedValue={mockSetSelectedValue} options={[]} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const optionElements = screen.queryAllByRole('option');
    expect(optionElements).toHaveLength(0);
  });

  it('maintains option selection after change', async () => {
    const user = userEvent.setup();
    const options = ['option1', 'option2', 'option3'];

    render(
      <Select setSelectedValue={mockSetSelectedValue} options={options} />
    );

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option3');

    expect(select).toHaveValue('option3');
  });
});
