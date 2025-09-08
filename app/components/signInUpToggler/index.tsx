import styles from './SignInUpToggler.module.css';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
import { togglers } from '@/sources/messages/togglers';
import { AppRoutes } from '@/sources/enums';

export const SignInUpToggler = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Button onClick={() => navigate(AppRoutes.SIGN_IN)}>
        {togglers.signIn}
      </Button>

      <Button onClick={() => navigate(AppRoutes.SIGN_UP)}>
        {togglers.signUp}
      </Button>
    </div>
  );
};
