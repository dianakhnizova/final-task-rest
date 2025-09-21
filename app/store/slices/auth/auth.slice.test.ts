import type { User } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';
import type { AuthUser } from '@/sources/interfaces';
import { authActions, authReducer } from './auth.slice';

describe('authSlice', () => {
  it('should set user with setUser', () => {
    const mockUser: AuthUser = {
      user: { id: '1', email: 'diana@test.com' } as User,
      accessToken: 'token123',
      expiresAt: 1234567890,
    };

    const initialState = { currentUser: null, error: null, isLoading: false };

    const state = authReducer(initialState, authActions.setUser(mockUser));

    expect(state.currentUser).toEqual(mockUser);
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('should clear user with clearUser', () => {
    const mockUser: AuthUser = {
      user: { id: '1', email: 'diana@test.com' } as User,
      accessToken: 'token123',
      expiresAt: 1234567890,
    };

    const initialState = {
      currentUser: mockUser,
      error: null,
      isLoading: false,
    };

    const state = authReducer(initialState, authActions.clearUser());

    expect(state.currentUser).toBeNull();
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});
