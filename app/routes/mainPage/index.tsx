import { SignInUpToggler } from '@/components/signInUpToggler';
import styles from './mainPage.module.css';
import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { mainPage as messages } from '@/sources/messages/mainPage';
import { Button } from '@/components/ui/button/Button';
import { handleHistory, handleRestClient, handleVariables } from './handlers';
import { AppRoutes } from '@/sources/enums';

export function meta() {
  return [
    { title: messages.metaTitle },
    { name: messages.metaName, content: messages.metaContent },
  ];
}

export default function MainPage() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    //todo - feat check auth
    setAuth(false); //for test, use result after feat check auth
    setUsername('Anonymous');
  }, []);

  const hasNestedRoutes = location.pathname !== AppRoutes.HOME;

  if (auth)
    return (
      <main className={styles.container}>
        <h2>
          {messages.welcomeOld} {username}
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
