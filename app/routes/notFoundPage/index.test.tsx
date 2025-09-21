import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, vi } from 'vitest';
import NotFoundPage from '.';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('NotFoundPage', () => {
  const renderWithRouter = () =>
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

  it('renders title, info and back link', () => {
    renderWithRouter();

    expect(screen.getByText('notFoundPage.title')).toBeInTheDocument();
    expect(screen.getByText(/notFoundPage.metaContent -/)).toBeInTheDocument();
    expect(screen.getByText('notFoundPage.btnBack')).toBeInTheDocument();

    const link = screen.getByText('notFoundPage.btnBack');
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
