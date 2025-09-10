import { Link } from 'react-router';

import { AppRoutes } from '@/sources/enums';

import { togglers } from '@/sources/messages/togglers';

import styles from './SignInUpToggler.module.css';

export const SignInUpToggler = () => {
  return (
    <div className={styles.container}>
      <Link to={AppRoutes.SIGN_IN} className={styles.link}>
        {togglers.signIn}
      </Link>

      <Link to={AppRoutes.SIGN_UP} className={styles.link}>
        {togglers.signUp}
      </Link>
    </div>
  );
};
