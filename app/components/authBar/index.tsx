import { selectAuth } from '@/store/slices/auth/selectors';
import { supabase } from '@/supabaseClient';

import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AppRoutes, Auth } from '@/sources/enums';

import { header as headerMessages } from '@/sources/messages/header';
import { toasts as toastMessages } from '@/sources/messages/toasts';

import { useActions } from '@/utils/hooks/useActions';

import { Button } from '../ui/button';

export const AuthBar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const { clearUser } = useActions();

  const handleSignIn = () => {
    navigate(AppRoutes.SIGN_IN);
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(Auth.USER);
    clearUser();
    toast.success(toastMessages.logOut);
    navigate(AppRoutes.HOME);
  };

  return (
    <>
      {user ? (
        <Button onClick={handleLogOut}>{headerMessages.logOut}</Button>
      ) : (
        <Button onClick={handleSignIn}>{headerMessages.signIn}</Button>
      )}
    </>
  );
};
