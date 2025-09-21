import { render } from '@testing-library/react';
import { LanguageIcon } from '../LanguageIcon';

describe('LanguageIcon', () => {
  it('renders the SVG element', () => {
    const { container } = render(<LanguageIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });
});
