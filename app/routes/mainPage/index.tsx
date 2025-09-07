import { SignInUpToggler } from '@/components/signInUpToggler';
import styles from './mainPage.module.css';
import { Outlet } from 'react-router';

export function meta() {
  return [
    { title: 'REST client App' },
    { name: 'description', content: 'Welcome to REST client App!' },
  ];
}

export default function MainPage() {
  return (
    <div className={styles.container}>
      <SignInUpToggler />
      <Outlet />
    </div>
  );
}
