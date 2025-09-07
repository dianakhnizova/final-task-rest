import { Button } from '@/components/ui/button/Button';
import styles from '../Header.module.css';
import { AppRoutes, Variant } from '@/sources/enums';
import { LanguageIcon, SunIcon } from '@/components/icons';
import { header as messages } from '@/sources/messages/header';
import { useNavigate } from 'react-router';

export const NavOptionMenu = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.right}>
      <Button variant={Variant.ICON}>
        <LanguageIcon />
      </Button>

      <Button variant={Variant.ICON}>
        <SunIcon />
      </Button>

      <Button onClick={() => navigate(AppRoutes.SIGN_IN)}>
        {messages.signIn}
      </Button>
    </div>
  );
};
