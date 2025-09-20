import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ButtonType } from '@/sources/enums';
import { Form } from '@/components/ui/form';
import styles from './Form.module.css';

describe('Form', () => {
  it('renders children', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <input type="text" placeholder="Test input" />
      </Form>
    );
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('renders button with custom label', () => {
    render(
      <Form onSubmit={vi.fn()} buttonLabel="Save">
        Content
      </Form>
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('applies disabled state to button', () => {
    render(
      <Form onSubmit={vi.fn()} isDisabled={true}>
        Content
      </Form>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn(e => e.preventDefault());

    render(
      <Form onSubmit={handleSubmit}>
        <input type="text" />
      </Form>
    );

    await user.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('button has correct type attribute', () => {
    render(<Form onSubmit={vi.fn()}>Content</Form>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', ButtonType.SUBMIT);
  });

  it('applies CSS classes', () => {
    const { container } = render(<Form onSubmit={vi.fn()}>Content</Form>);

    expect(container.querySelector('form')).toHaveClass(styles.form);
  });
});
