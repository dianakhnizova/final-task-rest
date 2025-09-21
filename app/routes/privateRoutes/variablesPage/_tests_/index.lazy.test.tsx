import { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { WaitingLoader } from '@/components/ui/waitingLoader';
import VariablesPageLazy from '../index.lazy';

vi.mock('@/routes//privateRoutes/variablesPage', () => ({
  default: () => <div data-testid="variables-page">Variables Page Content</div>,
  meta: vi.fn(),
}));

describe('VariablesPageLazy', () => {
  it('should render fallback initially', () => {
    render(
      <Suspense fallback={<WaitingLoader />}>
        <VariablesPageLazy />
      </Suspense>
    );

    expect(screen.getByTestId('waiting-loader')).toBeInTheDocument();
  });

  it('should render VariablesPage after loading', async () => {
    render(
      <Suspense fallback={<WaitingLoader />}>
        <VariablesPageLazy />
      </Suspense>
    );

    const page = await screen.findByTestId('variables-page');
    expect(page).toHaveTextContent('Variables Page Content');
  });
});
