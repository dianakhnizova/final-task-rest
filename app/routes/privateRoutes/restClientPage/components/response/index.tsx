import { selectBody, selectStatus } from '@/store/slices/restClient/selectors';

import type { FC } from 'react';

import { useSelector } from 'react-redux';

import { restClientPage } from '@/sources/messages/restClientPage';

import styles from './Response.module.css';

export const Response: FC = () => {
  const status = useSelector(selectStatus);
  const body = useSelector(selectBody);

  return (
    <div className={styles.container}>
      <p>
        {restClientPage.response.statusTitle} {status ?? ''}
      </p>
      <p>{restClientPage.response.bodyTitle}</p>
      <pre>{body ?? restClientPage.response.emptyData}</pre>
    </div>
  );
};
