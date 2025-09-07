import { Logo } from '@/components/icons/';
import styles from '../Header.module.css';

export const NavLogo = () => {
  return (
    <div className={styles.left}>
      <a className={styles.home}>
        <Logo />
        <span>Home</span>
      </a>
    </div>
  );
};
