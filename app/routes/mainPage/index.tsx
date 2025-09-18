import {
  selectAuth,
  selectIsAuthenticated,
} from '@/store/slices/auth/selectors';

import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router';

import { AppRoutes } from '@/sources/enums';

import { mainPage as mainPageMessages } from '@/sources/messages/mainPage';

import { AboutUs } from '@/components/aboutUs';
import { Navigation } from '@/components/navigation';
import { SignInUpToggler } from '@/components/signInUpToggler';

import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './MainPage.module.css';

export const meta = pageMeta(mainPageMessages);

export default function MainPage() {
  const user = useSelector(selectAuth);
  const token = useSelector(selectIsAuthenticated);

  const location = useLocation();

  const hasNestedRoutes = location.pathname !== AppRoutes.HOME;

  if (user)
    return (
      <main className={styles.container}>
        <h2 className={styles.welcome}>
          {mainPageMessages.welcomeOld}
          <p className={styles.name}>{user.user_metadata.name}</p>
        </h2>

        <Navigation />

        <Link to={AppRoutes.HOME} className={styles.link}>
          {mainPageMessages.mainPage}
        </Link>

        <AboutUs />
      </main>
    );

  return (
    <main className={styles.container}>
      {!hasNestedRoutes && (
        <>
          <div className={styles.content}>
            <h2>{mainPageMessages.welcomeNew}</h2>

            {token ? (
              <Link to={AppRoutes.HOME} className={styles.link}>
                {mainPageMessages.mainPage}
              </Link>
            ) : (
              <SignInUpToggler />
            )}
          </div>

          <AboutUs />
        </>
      )}

      <Outlet />
    </main>
  );
}
