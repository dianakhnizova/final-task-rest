import { render } from '@testing-library/react';
import { RsSchoolLogo } from '../RsSchoolLogo';

describe('RsSchoolLogo', () => {
  it('renders the SVG element', () => {
    const { container } = render(<RsSchoolLogo />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });
});
