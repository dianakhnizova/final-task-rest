import styles from './Header.module.css';
import useInView from '@/utils/hooks/useInView.ts';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button/Button.tsx';
import { GithubLogo, LanguageIcon, SunIcon } from '@/components/icons';
import { Variant } from '@/sources/enums.ts';
import { header as messages } from '@/sources/messages/header.ts';

export const Header = () => {
  const [triggerRef, inView] = useInView();

  const iconSize = '1.25rem';

  return (
    <>
      <div className={styles.banner}>
        <h3>{messages.banner}</h3>
      </div>
      <div ref={triggerRef}></div>
      <header className={clsx(styles.header, !inView && styles.stuck)}>
        <div className={styles.left}>
          <a className={styles.home}>
            <GithubLogo width="1.5rem" height="1.5rem" />
            <span>Home</span>
          </a>
        </div>
        <div className={styles.right}>
          <Button variant={Variant.ICON}>
            <LanguageIcon width={iconSize} height={iconSize} />
          </Button>
          <Button variant={Variant.ICON}>
            <SunIcon width={iconSize} height={iconSize} />
          </Button>
          <Button>{messages.signIn}</Button>
        </div>
      </header>
    </>
  );
};
