import { messages } from '@/sources/messages';

import { getErrorData } from '@/utils/getErrorData';

import type { Route } from '../../+types/root';
import styles from './ErrorBoundary.module.css';

export function ErrorBoundaryComponent({
  error,
  params,
}: Route.ErrorBoundaryProps) {
  const { message, details, stack } = getErrorData(error);

  return (
    <main className={styles.errorBoundary}>
      <h1 className={styles.errorTitle}>{message}</h1>

      <p className={styles.errorDetails}>{details}</p>
      {stack && (
        <pre className={styles.errorStack}>
          <code>{stack}</code>
        </pre>
      )}

      {import.meta.env.DEV && params && (
        <div className={styles.debugParams}>
          <h3 className={styles.debugTitle}>{messages.errorBoundary.params}</h3>
          <pre className={styles.debugContent}>
            {JSON.stringify(params, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
