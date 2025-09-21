import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RestClientPageLazy from './index.lazy';

vi.mock('@/routes/privateRoutes/restClientPage', async () => {
  const actual = await vi.importActual('@/routes/privateRoutes/restClientPage');
  return {
    ...actual,
    default: () => <div data-testid="rest-client">Rest Client Page</div>,
    meta: actual.meta,
  };
});

describe('RestClientPageLazy', () => {
  it('should render fallback initially', () => {
    render(<RestClientPageLazy />);
    const loader = screen.getByRole('img', { name: /loading/i });
    expect(loader).toBeInTheDocument();
  });

  it('should render the actual component', async () => {
    render(<RestClientPageLazy />);
    const element = await screen.findByTestId('rest-client');
    expect(element).toBeInTheDocument();
  });
});
