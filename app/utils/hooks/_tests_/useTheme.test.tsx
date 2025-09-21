import { ThemeContext } from '@/contexts/ThemeContext';
import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Theme } from '@/sources/enums';
import type { ThemeContextValue } from '@/sources/interfaces';
import { errors } from '@/sources/messages/errors';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  it('should throw an error if used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(errors.themeError);
  });

  it('should return context value when used inside ThemeProvider', () => {
    const mockContext: ThemeContextValue = {
      theme: Theme.LIGHT,
      toggleTheme: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeContext.Provider value={mockContext}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual(mockContext);
  });
});
