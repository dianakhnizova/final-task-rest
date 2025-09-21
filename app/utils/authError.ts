import type { AuthError } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { AuthErrors } from '@/sources/enums';

export const authError = (
  error: AuthError | null,
  t: (key: string) => string
) => {
  if (error) {
    switch (error.code) {
      case AuthErrors.USER_EXIST:
        toast.error(t('toasts.userExist'));
        break;
      case AuthErrors.CREDENTIALS_INVALID:
        toast.error(t('toasts.invalidPasswordEmail'));
        break;
      case AuthErrors.NOT_CONFIRMED:
        toast.error(t('toasts.errorConfirmEmail'));
        break;
      default:
        toast.error(error.message);
    }
  }

  return error;
};
