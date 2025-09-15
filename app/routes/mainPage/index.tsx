import { selectAuth } from '@/store/slices/auth/selectors';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';

import { AppRoutes } from '@/sources/enums';

import { mainPage as messages } from '@/sources/messages/mainPage';

import { SignInUpToggler } from '@/components/signInUpToggler';
import { Button } from '@/components/ui/button';

import { pageMeta } from '@/utils/metaHelpers.ts';

import { handleHistory, handleRestClient, handleVariables } from './handlers';
import styles from './mainPage.module.css';

export const meta = pageMeta(messages);

export default function MainPage() {
  const user = useSelector(selectAuth);
  const location = useLocation();
  const navigate = useNavigate();

  const hasNestedRoutes = location.pathname !== AppRoutes.HOME;

  const [searchParams] = useSearchParams();

  const redirectBackTo = searchParams.get('redirect');

  useEffect(() => {
    if (user && redirectBackTo) {
      navigate(redirectBackTo);
    }
  }, [user, navigate, redirectBackTo]);

  if (user)
    return (
      <main className={styles.container}>
        <h2>
          {messages.welcomeOld} {user.user_metadata.name}
        </h2>

        <section className={styles.btnSection}>
          <Button onClick={() => handleRestClient(navigate)}>
            {messages.btnRestClient}
          </Button>
          <Button onClick={() => handleHistory(navigate)}>
            {messages.btnHistory}
          </Button>
          <Button onClick={() => handleVariables(navigate)}>
            {messages.btnVariables}
          </Button>
        </section>
      </main>
    );

  return (
    <main className={styles.container}>
      {!hasNestedRoutes && (
        <div className={styles.content}>
          <h2 className={styles.title}>{messages.welcomeNew}</h2>
          <SignInUpToggler />
        </div>
      )}

      <Outlet />
    </main>
  );
}
