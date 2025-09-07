import { useEffect, useState } from 'react';
import styles from './mainPage.module.css';
import { mainPage as messages } from '@/sources/messages/mainPage';
import { Button } from '@/components/ui/button/Button';

export function meta() {
  return [
    { title: messages.metaTitle },
    { name: messages.metaName, content: messages.metaContent },
  ];
}

export default function MainPage() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  const handleSignIn = () => {
    //todo - feat component for sign in
    //setAuth(result)
  };

  const handleSignUp = () => {
    //todo - feat component for sign up
    //setAuth(result)
  };

  const handleRestClient = () => {
    //todo - feat component for REST Client
  };

  const handleHistory = () => {
    //todo - feat component for History
  };

  const handleVariables = () => {
    //todo - feat component for Variables
  };

  useEffect(() => {
    //todo - feat check auth
    setAuth(false); //for test, use result after feat check auth
    setUsername('Anonymous');
  }, []);

  if (auth)
    return (
      <main className={styles.container}>
        <h2>Welcome Back, {username}!</h2>
        <section className={styles.btnSection}>
          <Button onClick={handleRestClient}>{messages.btnRestClient}</Button>
          <Button onClick={handleHistory}>{messages.btnHistory}</Button>
          <Button onClick={handleVariables}>{messages.btnVariables}</Button>
        </section>
      </main>
    );

  return (
    <main className={styles.container}>
      <h2>Welcome!</h2>
      <section className={styles.btnSection}>
        <Button onClick={handleSignIn}>{messages.btnSignIn}</Button>
        <Button onClick={handleSignUp}>{messages.btnSignUp}</Button>
      </section>
    </main>
  );
}
