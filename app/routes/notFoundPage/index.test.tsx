import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';
import { describe, it, vi } from 'vitest';
import { AppRoutes } from '@/sources/enums';
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
    expect(screen.getByText('buttons.btnBack')).toBeInTheDocument();

    const link = screen.getByText('buttons.btnBack');
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('displays the correct pathname in info paragraph', () => {
    const testPathname = '/random/path';

    render(
      <MemoryRouter initialEntries={[testPathname]}>
        <Routes>
          <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    const info = screen.getByText(new RegExp(testPathname));
    expect(info).toBeInTheDocument();
  });

  it('back link navigates to home route', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/random/path']}>
        <Routes>
          <Route path={AppRoutes.HOME} element={<div>Home Page</div>} />
          <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    const backLink = screen.getByText('buttons.btnBack');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');

    await user.click(backLink);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
