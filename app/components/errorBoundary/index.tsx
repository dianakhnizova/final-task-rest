import { useTranslation } from 'react-i18next';
import { getErrorData } from '@/components/errorBoundary/getErrorData';
import type { Route } from '../../+types/root';
import styles from './errorBoundary.module.css';

export function ErrorBoundaryComponent({
  error,
  params,
}: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();

  const { message, details, stack } = getErrorData(error, t);

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
          <h3 className={styles.debugTitle}>{t('errorBoundary.params')}</h3>
          <pre className={styles.debugContent}>
            {JSON.stringify(params, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
