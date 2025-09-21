import { render } from '@testing-library/react';
import { SunIcon } from '../SunIcon';

describe('SunIcon', () => {
  it('renders the SVG element', () => {
    const { container } = render(<SunIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });
});
