import styles from './mainPage.module.css';

export function meta() {
  return [
    { title: 'REST client App' },
    { name: 'description', content: 'Welcome to REST client App!' },
  ];
}

export default function MainPage() {
  return (
    <div className={styles.container}>
      <h2>Home Page</h2>
    </div>
  );
}
