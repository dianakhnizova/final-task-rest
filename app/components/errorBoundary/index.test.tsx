import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';
import { ErrorBoundaryComponent } from '.';
import * as getErrorDataModule from './getErrorData';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('ErrorBoundaryComponent', () => {
  const mockError = new Error('Test error');

  beforeEach(() => {
    vi.spyOn(getErrorDataModule, 'getErrorData').mockReturnValue({
      message: 'Test message',
      details: 'Test details',
      stack: 'Test stack',
    });
  });

  it('renders error message, details and stack', () => {
    render(
      <ErrorBoundaryComponent error={mockError} params={{ '*': undefined }} />
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Test details')).toBeInTheDocument();
    expect(screen.getByText('Test stack')).toBeInTheDocument();
  });
});
