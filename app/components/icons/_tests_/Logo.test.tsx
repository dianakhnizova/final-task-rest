import { render, screen } from '@testing-library/react';
import { LOGO_URL } from '@/sources/constants/constants';
import { header as messages } from '@/sources/messages/header';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renders the logo image with correct src and alt', () => {
    render(<Logo />);
    const img = screen.getByAltText(
      messages.textInsteadLogo
    ) as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(new RegExp(`${LOGO_URL.replace('./', '')}$`));
  });
});
