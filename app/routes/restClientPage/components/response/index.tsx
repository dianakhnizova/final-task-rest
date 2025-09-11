import { restClientPage } from '@/sources/messages/restClientPage';

import styles from './Response.module.css';

export const Response = () => {
  return (
    <div className={styles.container}>
      <p>{restClientPage.response.statusTitle}</p>
      <p>{restClientPage.response.bodyTitle}</p>
    </div>
  );
};
