import type { Route } from '../../+types/root';
import { isRouteErrorResponse } from 'react-router';
import styles from './ErrorBoundary.module.css';

export function ErrorBoundaryComponent({
  error,
  params,
}: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

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
          <h3 className={styles.debugTitle}>Params:</h3>
          <pre className={styles.debugContent}>
            {JSON.stringify(params, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
