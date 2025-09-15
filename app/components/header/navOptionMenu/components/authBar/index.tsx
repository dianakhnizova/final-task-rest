import { selectAuth } from '@/store/slices/auth/selectors';
import { clearSettingsLS } from '@/store/slices/settings/settingsLS.ts';
import { supabase } from '@/supabaseClient';

import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AppRoutes, Auth } from '@/sources/enums';

import { header as headerMessages } from '@/sources/messages/header';
import { toasts as toastMessages } from '@/sources/messages/toasts';

import { Button } from '@/components/ui/button';

import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';

export const AuthBar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const { clearUser } = useActions();

  const { removeUserFromStorage } = useSaveUserToLS(Auth.USER, null);

  const handleSignIn = () => {
    navigate(AppRoutes.SIGN_IN);
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    removeUserFromStorage();
    clearSettingsLS();
    toast.success(`${user?.user_metadata.name} ${toastMessages.logOut}`);

    clearUser();
    navigate(AppRoutes.HOME);
  };

  return user ? (
    <Button onClick={handleLogOut}>{headerMessages.logOut}</Button>
  ) : (
    <Button onClick={handleSignIn}>{headerMessages.signIn}</Button>
  );
};
