import { clsx } from 'clsx';

import { header as messages } from '@/sources/messages/header.ts';

import useInView from '@/utils/hooks/useInView.ts';

import styles from './Header.module.css';
import { NavLogo } from './navLogo';
import { NavOptionMenu } from './navOptionMenu';

export const Header = () => {
  const [triggerRef, inView] = useInView();

  return (
    <>
      <div className={styles.banner}>
        <h3>{messages.banner}</h3>
      </div>

      <div ref={triggerRef} />

      <header className={clsx(styles.header, !inView && styles.stuck)}>
        <NavLogo />
        <NavOptionMenu />
      </header>
    </>
  );
};
