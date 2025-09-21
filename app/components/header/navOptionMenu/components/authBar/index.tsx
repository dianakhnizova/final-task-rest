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

  const handleSignUp = () => {
    navigate(AppRoutes.SIGN_UP);
  };

  const handleLogOut = async () => {
    toast.success(t('toasts.logOutInit'), {
      id: 'logOutId',
      duration: TOAST_DURATION_LONG,
    });

    await supabase.auth.signOut();
    removeUserFromStorage();
    clearSettingsLS();

    toast.success(`${user?.user_metadata.name} ${t('toasts.logOut')}`, {
      id: 'logOutId',
      duration: TOAST_DURATION,
    });

    clearUser();
    navigate(AppRoutes.HOME);
  };

  return user ? (
    <>
      <Button onClick={handleLogOut}>{t('buttons.logOut')}</Button>
      <Button onClick={() => navigate(AppRoutes.HOME)}>
        {t('mainPage.mainPage')}
      </Button>
    </>
  ) : (
    <>
      <Button onClick={handleSignIn}>{t('buttons.signIn')}</Button>
      <Button onClick={handleSignUp}>{t('buttons.signUp')}</Button>
    </>
  );
};
