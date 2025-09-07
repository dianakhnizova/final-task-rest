import { notFoundPage as messages } from '@/sources/messages/notFoundPage';
import type { Route } from '../../+types/root';
import styles from './notFoundPage.module.css';

export function meta({ location }: Route.MetaArgs) {
  return [
    { title: messages.metaTitle },
    {
      name: messages.metaName,
      content: `${messages.metaContent} - ${location.pathname}`,
    },
  ];
}

export default function notFoundPage() {
  return (
    <main className={styles.notFoundContainer}>
      <section>
        <h1 className={styles.notFoundTitle}>{messages.title}</h1>
        <p className={styles.notFoundInfo}>
          {messages.metaContent} - {location.pathname}
        </p>
      </section>
    </main>
  );
}
