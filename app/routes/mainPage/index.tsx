import { SignInUpToggler } from '@/components/signInUpToggler';
import styles from './mainPage.module.css';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { mainPage as messages } from '@/sources/messages/mainPage';
import { Button } from '@/components/ui/button/Button';
import { handleHistory, handleRestClient, handleVariables } from './handlers';

export function meta() {
  return [
    { title: messages.metaTitle },
    { name: messages.metaName, content: messages.metaContent },
  ];
}

export default function MainPage() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    //todo - feat check auth
    setAuth(false); //for test, use result after feat check auth
    setUsername('Anonymous');
  }, []);

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
      <h2>{messages.welcomeNew}</h2>

      <SignInUpToggler />

      <Outlet />
    </main>
  );
}
