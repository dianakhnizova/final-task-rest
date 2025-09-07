import styles from './Header.module.css';
import useInView from '@/utils/hooks/useInView.ts';
import { clsx } from 'clsx';
import { header as messages } from '@/sources/messages/header.ts';
import { NavLogo } from './navLogo';
import { NavOptionMenu } from './navOptionMenu';

export const Header = () => {
  const [triggerRef, inView] = useInView();

  return (
    <>
      <div className={styles.banner}>
        <h3>{messages.banner}</h3>
      </div>

      <div ref={triggerRef}></div>

      <header className={clsx(styles.header, !inView && styles.stuck)}>
        <NavLogo />
        <NavOptionMenu />
      </header>
    </>
  );
};
