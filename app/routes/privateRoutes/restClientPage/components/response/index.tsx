import type { FC } from 'react';

import { restClientPage } from '@/sources/messages/restClientPage';

import styles from './Response.module.css';

interface Props {
  status?: number | null;
  body?: string | null;
}

export const Response: FC<Props> = ({ status, body }) => {
  return (
    <div className={styles.container}>
      <p>
        {restClientPage.response.statusTitle}: {status ?? '-'}
      </p>
      <p>{restClientPage.response.bodyTitle}:</p>
      <pre>{body ?? 'No data yet'}</pre>
    </div>
  );
};
