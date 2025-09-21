import type { AuthError } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthErrors } from '@/sources/enums';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { authError } from '../authError';

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
  },
}));

describe('authError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast.error with userExist message', () => {
    const error: Partial<AuthError> = {
      code: AuthErrors.USER_EXIST,
      message: 'User exists',
    };
    authError(error as AuthError);
    expect(toast.error).toHaveBeenCalledWith(toastMessages.userExist);
  });

  it('calls toast.error with invalidPasswordEmail message', () => {
    const error: Partial<AuthError> = {
      code: AuthErrors.CREDENTIALS_INVALID,
      message: 'Invalid credentials',
    };
    authError(error as AuthError);
    expect(toast.error).toHaveBeenCalledWith(
      toastMessages.invalidPasswordEmail
    );
  });

  it('calls toast.error with errorConfirmEmail message', () => {
    const error: Partial<AuthError> = {
      code: AuthErrors.NOT_CONFIRMED,
      message: 'Not confirmed',
    };
    authError(error as AuthError);
    expect(toast.error).toHaveBeenCalledWith(toastMessages.errorConfirmEmail);
  });

  it('calls toast.error with default message for unknown code', () => {
    const error: Partial<AuthError> = {
      code: 'UNKNOWN_ERROR',
      message: 'Some error',
    };
    authError(error as AuthError);
    expect(toast.error).toHaveBeenCalledWith('Some error');
  });

  it('returns null if error is null', () => {
    const result = authError(null);
    expect(result).toBeNull();
    expect(toast.error).not.toHaveBeenCalled();
  });
});
