import type { User } from '@supabase/supabase-js';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LS_KEY } from '@/sources/enums';
import type { AuthUser } from '@/sources/interfaces';
import { useSaveUserToLS } from '../useSaveUserToLS';

vi.mock('../useActions', () => ({
  useActions: () => ({
    setUser: vi.fn(),
  }),
}));

describe('useSaveUserToLS', () => {
  const initialUser: AuthUser | null = null;

  const testUser: AuthUser = {
    user: {
      id: '1',
      email: 'test@example.com',
      aud: 'authenticated',
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString(),
    } as User,
    accessToken: 'test-access-token',
    expiresAt: Date.now() + 1000 * 60 * 60,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with null if no value in localStorage', () => {
    const { result } = renderHook(() =>
      useSaveUserToLS(LS_KEY.USER, initialUser)
    );
    expect(result.current.storedValue).toBeNull();
  });

  it('should save user to localStorage and state', () => {
    const { result } = renderHook(() =>
      useSaveUserToLS(LS_KEY.USER, initialUser)
    );

    act(() => {
      result.current.setUserToStorage(testUser);
    });

    expect(result.current.storedValue).toEqual(testUser);
    expect(JSON.parse(localStorage.getItem(LS_KEY.USER)!)).toEqual(testUser);
  });

  it('should remove user from localStorage and reset state', () => {
    const { result } = renderHook(() =>
      useSaveUserToLS(LS_KEY.USER, initialUser)
    );

    act(() => {
      result.current.setUserToStorage(testUser);
    });

    act(() => {
      result.current.removeUserFromStorage();
    });

    expect(result.current.storedValue).toBeNull();
    expect(localStorage.getItem(LS_KEY.USER)).toBeNull();
  });
});
