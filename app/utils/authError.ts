import type { AuthError } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

import { AuthErrors } from '@/sources/enums';

import { toasts as toastMessages } from '@/sources/messages/toasts';

export const authError = (error: AuthError | null) => {
  if (error) {
    switch (error.code) {
      case AuthErrors.USER_EXIST:
        toast.error(toastMessages.userExist);
        break;
      case AuthErrors.CREDENTIALS_INVALID:
        toast.error(toastMessages.invalidPasswordEmail);
        break;
      case AuthErrors.NOT_CONFIRMED:
        toast.error(toastMessages.errorConfirmEmail);
        break;
      default:
        toast.error(error.message);
    }
  }

  return error;
};
