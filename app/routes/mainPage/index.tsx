import { SignInUpToggler } from '@/components/signInUpToggler';
import styles from './mainPage.module.css';
import { Outlet, useLocation } from 'react-router';
import { mainPage as messages } from '@/sources/messages/mainPage';
import { Button } from '@/components/ui/button';
import { handleHistory, handleRestClient, handleVariables } from './handlers';
import { AppRoutes } from '@/sources/enums';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/store/slices/auth/selectors';

export function meta() {
  return [
    { title: messages.metaTitle },
    { name: messages.metaName, content: messages.metaContent },
  ];
}

export default function MainPage() {
  const user = useSelector(selectAuth);
  const location = useLocation();

  const hasNestedRoutes = location.pathname !== AppRoutes.HOME;

  if (user)
    return (
      <main className={styles.container}>
        <h2>
          {messages.welcomeOld} {user.user_metadata.name}
        </h2>

        <section className={styles.btnSection}>
          <Button onClick={handleRestClient}>{messages.btnRestClient}</Button>
          <Button onClick={handleHistory}>{messages.btnHistory}</Button>
          <Button onClick={handleVariables}>{messages.btnVariables}</Button>
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
