import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { AppRoutes } from '@/sources/enums';
import styles from './SignInUpLinks.module.css';

export const SignInUpLinks = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Link to={AppRoutes.SIGN_IN} className={styles.link}>
        {t('buttons.signIn')}
      </Link>

      <Link to={AppRoutes.SIGN_UP} className={styles.link}>
        {t('buttons.signUp')}
      </Link>
    </div>
  );
};
