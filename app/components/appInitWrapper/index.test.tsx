import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useAppInitializer } from '@/utils/hooks/useAppInitializer';
import AppInitWrapper from '.';

vi.mock('@/utils/hooks/useAppInitializer', () => ({
  useAppInitializer: vi.fn(),
}));

describe('AppInitWrapper', () => {
  it('useAppInitializer', () => {
    render(
      <AppInitWrapper>
        <div>Child content</div>
      </AppInitWrapper>
    );

    expect(useAppInitializer).toHaveBeenCalled();
  });

  it('render children', () => {
    render(
      <AppInitWrapper>
        <span>Test content</span>
      </AppInitWrapper>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
