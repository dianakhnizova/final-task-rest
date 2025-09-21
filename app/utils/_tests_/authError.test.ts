import type { AuthError } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthErrors } from '@/sources/enums';
import { authError } from '../authError';

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
  },
}));

describe('authError', () => {
  const t = (key: string) => key;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show USER_EXIST toast', () => {
    const error = {
      code: AuthErrors.USER_EXIST,
      message: 'User exists',
    } as unknown as AuthError;

    authError(error, t);
    expect(toast.error).toHaveBeenCalledWith('toasts.userExist');
  });

  it('should show CREDENTIALS_INVALID toast', () => {
    const error = {
      code: AuthErrors.CREDENTIALS_INVALID,
      message: 'Invalid credentials',
    } as unknown as AuthError;

    authError(error, t);
    expect(toast.error).toHaveBeenCalledWith('toasts.invalidPasswordEmail');
  });

  it('should show NOT_CONFIRMED toast', () => {
    const error = {
      code: AuthErrors.NOT_CONFIRMED,
      message: 'Not confirmed',
    } as unknown as AuthError;

    authError(error, t);
    expect(toast.error).toHaveBeenCalledWith('toasts.errorConfirmEmail');
  });

  it('should show default toast for unknown errors', () => {
    const error = {
      code: 'UNKNOWN_ERROR',
      message: 'Something went wrong',
    } as unknown as AuthError;

    authError(error, t);
    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
  });

  it('should return null if no error', () => {
    const result = authError(null, t);
    expect(result).toBeNull();
    expect(toast.error).not.toHaveBeenCalled();
  });
});
