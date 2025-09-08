import { Logo } from '@/components/icons/';
import styles from '../Header.module.css';
import { AppRoutes } from '@/sources/enums';
import { Link } from 'react-router';
import { header as messages } from '@/sources/messages/header';

export const NavLogo = () => {
  return (
    <div className={styles.left}>
      <Link className={styles.home} to={AppRoutes.HOME}>
        <Logo />
        <span>{messages.textForLogo}</span>
      </Link>
    </div>
  );
};
