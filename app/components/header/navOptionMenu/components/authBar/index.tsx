import { selectAuth } from '@/store/slices/auth/selectors';
import { clearSettingsLS } from '@/store/slices/settings/settingsLS.ts';
import { supabase } from '@/supabaseClient';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppRoutes, LS_KEY } from '@/sources/enums';
import {
  TOAST_DURATION,
  TOAST_DURATION_LONG,
} from '@/sources/constants/constants';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { Button } from '@/components/ui/button';
import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';

export const AuthBar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const { clearUser } = useActions();

  const { removeUserFromStorage } = useSaveUserToLS(LS_KEY.USER, null);

  const handleSignIn = () => {
    navigate(AppRoutes.SIGN_IN);
  };

  const handleLogOut = async () => {
    toast.success(toastMessages.logOutInit, {
      id: toastMessages.logOutId,
      duration: TOAST_DURATION_LONG,
    });

    await supabase.auth.signOut();
    removeUserFromStorage();
    clearSettingsLS();

    toast.success(`${user?.user_metadata.name} ${toastMessages.logOut}`, {
      id: toastMessages.logOutId,
      duration: TOAST_DURATION,
    });

    clearUser();
    navigate(AppRoutes.HOME);
  };

  return user ? (
    <Button onClick={handleLogOut}>{t('header.logOut')}</Button>
  ) : (
    <Button onClick={handleSignIn}>{t('header.signIn')}</Button>
  );
};
