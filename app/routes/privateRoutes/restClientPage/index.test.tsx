import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, vi } from 'vitest';
import RestClientPage from '.';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/components/navigation', () => ({
  Navigation: ({ isRestClientPage }: { isRestClientPage?: boolean }) => (
    <div>Navigation Component {isRestClientPage ? 'RestClient' : ''}</div>
  ),
}));

vi.mock('./components/urlBox', () => ({
  UrlBox: () => <div>UrlBox Component</div>,
}));

vi.mock('./components/headers', () => ({
  Headers: () => <div>Headers Component</div>,
}));

vi.mock('./components/codeGenerator', () => ({
  CodeGenerator: () => <div>CodeGenerator Component</div>,
}));

vi.mock('./components/parser', () => ({
  Parser: () => <div>Parser Component</div>,
}));

vi.mock('./components/bodyEditor', () => ({
  BodyEditor: () => <div>BodyEditor Component</div>,
}));

vi.mock('./components/requestSender', () => ({
  RequestSender: () => <div>RequestSender Component</div>,
}));

describe('RestClientPage', () => {
  const renderWithRouter = () =>
    render(
      <BrowserRouter>
        <RestClientPage />
      </BrowserRouter>
    );

  it('renders all subcomponents', () => {
    renderWithRouter();

    expect(
      screen.getByText('Navigation Component RestClient')
    ).toBeInTheDocument();
    expect(screen.getByText('UrlBox Component')).toBeInTheDocument();
    expect(screen.getByText('Headers Component')).toBeInTheDocument();
    expect(screen.getByText('CodeGenerator Component')).toBeInTheDocument();
    expect(screen.getByText('Parser Component')).toBeInTheDocument();
    expect(screen.getByText('BodyEditor Component')).toBeInTheDocument();
    expect(screen.getByText('RequestSender Component')).toBeInTheDocument();
  });
});
