import { render } from '@testing-library/react';
import { GithubLogo } from '../GithubLogo';

describe('GithubLogo', () => {
  it('renders the SVG element', () => {
    const { container } = render(<GithubLogo />);

    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });
});
