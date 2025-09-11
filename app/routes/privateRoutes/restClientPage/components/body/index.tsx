import { restClientPage } from '@/sources/messages/restClientPage';

import styles from './Body.module.css';

export const Body = () => {
  return (
    <div className={styles.container}>
      <p>{restClientPage.body.codeTitle}</p>
      <p>{restClientPage.body.bodyTitle}</p>
    </div>
  );
};
