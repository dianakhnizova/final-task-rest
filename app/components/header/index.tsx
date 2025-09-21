import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { WrapperId } from '@/sources/enums';
import Wrapper from '@/components/wrapper';
import useInView from '@/utils/hooks/useInView.ts';
import styles from './header.module.css';
import { NavLogo } from './navLogo';
import { NavOptionMenu } from './navOptionMenu';

export const Header = () => {
  const { t } = useTranslation();
  const [triggerRef, inView] = useInView();

  return (
    <>
      <div className={styles.banner}>
        <h3>{t('header.banner')}</h3>
      </div>

      <div ref={triggerRef} />

      <header className={clsx(styles.header, !inView && styles.stuck)}>
        <Wrapper id={WrapperId.header}>
          <section className={clsx(styles.header, inView && styles.stuck)}>
            <NavLogo />
            <NavOptionMenu />
          </section>
        </Wrapper>
      </header>
    </>
  );
};
