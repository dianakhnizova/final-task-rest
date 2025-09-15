import { useLocation } from 'react-router';

import { AppRoutes } from '@/sources/enums';

import { notFoundPage as messages } from '@/sources/messages/notFoundPage';

import type { Route } from '../../+types/root';
import styles from './NotFoundPage.module.css';

export function meta({ location }: Route.MetaArgs) {
  return [
    { title: messages.metaTitle },
    {
      name: messages.metaName,
      content: `${messages.metaContent} - ${location.pathname}`,
    },
  ];
}

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <main className={styles.notFoundContainer}>
      <section className={styles.notFoundSection}>
        <h1 className={styles.notFoundTitle}>{messages.title}</h1>

        <p className={styles.notFoundInfo}>
          {messages.metaContent} - {location.pathname}
        </p>

        <a className={styles.notFoundBtnBack} href={AppRoutes.HOME}>
          {messages.btnBack}
        </a>
      </section>
    </main>
  );
}
