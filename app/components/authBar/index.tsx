import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/store/slices/auth/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { AppRoutes } from '@/sources/enums';
import { supabase } from '@/supabaseClient';
import { Button } from '../ui/button';
import { header as messages } from '@/sources/messages/header';

export const AuthBar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const { clearUser } = useActions();

  const handleSignIn = () => {
    navigate(AppRoutes.SIGN_IN);
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    clearUser();
    navigate(AppRoutes.HOME);
  };

  return (
    <>
      {user ? (
        <Button onClick={handleLogOut}>{messages.logOut}</Button>
      ) : (
        <Button onClick={handleSignIn}>{messages.signIn}</Button>
      )}
    </>
  );
};
