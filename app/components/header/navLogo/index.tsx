import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { AppRoutes } from '@/sources/enums';
import { Logo } from '@/components/icons/';
import styles from '../header.module.css';

export const NavLogo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.left}>
      <Link className={styles.home} to={AppRoutes.HOME}>
        <Logo />
        <span>{t('header.textForLogo')}</span>
      </Link>
    </div>
  );
};
