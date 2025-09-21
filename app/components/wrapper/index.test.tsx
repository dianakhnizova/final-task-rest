import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WrapperId } from '@/sources/enums';
import { Wrapper } from '@/components/wrapper';

vi.mock('clsx', () => ({
  clsx: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' '),
}));

vi.mock('./wrapper.module.css', () => ({
  default: {
    wrapper: 'wrapper',
  },
}));

describe('Wrapper', () => {
  it('renders children correctly', () => {
    render(
      <Wrapper>
        <div data-testid="child">Test Content</div>
      </Wrapper>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default id when not provided', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('id', WrapperId.default);
  });

  it('applies custom id when provided', () => {
    const customId = 'custom-wrapper';
    const { container } = render(
      <Wrapper id={customId}>
        <div>Content</div>
      </Wrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('id', customId);
  });

  it('applies wrapper CSS class by default', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('wrapper');
  });

  it('applies custom className in addition to default', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <Wrapper className={customClass}>
        <div>Content</div>
      </Wrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('wrapper');
    expect(wrapper).toHaveClass(customClass);
  });

  it('applies multiple custom classNames', () => {
    const customClasses = 'custom-class another-class';
    const { container } = render(
      <Wrapper className={customClasses}>
        <div>Content</div>
      </Wrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('wrapper');
    expect(wrapper).toHaveClass('custom-class');
    expect(wrapper).toHaveClass('another-class');
  });

  it('renders with empty className prop', () => {
    const { container } = render(
      <Wrapper className="">
        <div>Content</div>
      </Wrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('wrapper');
  });

  it('renders with complex children structure', () => {
    render(
      <Wrapper>
        <h1>Title</h1>
        <p>Paragraph</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </Wrapper>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders without children', () => {
    const { container } = render(<Wrapper />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toBeEmptyDOMElement();
  });

  it('matches snapshot with default props', () => {
    const { container } = render(
      <Wrapper>
        <div>Content</div>
      </Wrapper>
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with custom props', () => {
    const { container } = render(
      <Wrapper id="custom-id" className="custom-class">
        <div>Content</div>
      </Wrapper>
    );

    expect(container).toMatchSnapshot();
  });
});
