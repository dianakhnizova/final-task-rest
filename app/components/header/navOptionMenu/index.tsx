import { Button } from '@/components/ui/button';
import styles from '../Header.module.css';
import { AppRoutes, Variant } from '@/sources/enums';
import { LanguageIcon, SunIcon } from '@/components/icons';
import { header as messages } from '@/sources/messages/header';
import { useNavigate } from 'react-router';
import { useActions } from '@/utils/hooks/useActions';
import { supabase } from '@/supabaseClient';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/store/slices/auth/selectors';

export const NavOptionMenu = () => {
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
    <div className={styles.right}>
      <Button variant={Variant.ICON}>
        <LanguageIcon />
      </Button>

      <Button variant={Variant.ICON}>
        <SunIcon />
      </Button>

      {user ? (
        <Button onClick={handleLogOut}>{messages.logOut}</Button>
      ) : (
        <Button onClick={handleSignIn}>{messages.signIn}</Button>
      )}
    </div>
  );
};
