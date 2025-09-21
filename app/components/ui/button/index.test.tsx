import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Variant } from '@/sources/enums';
import { Button } from '@/components/ui/button/';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    render(<Button variant={Variant.SECONDARY}>Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/secondary/);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">With class</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/custom-class/);
  });

  it('passes additional props', () => {
    render(<Button data-testid="my-btn">Test</Button>);
    expect(screen.getByTestId('my-btn')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
