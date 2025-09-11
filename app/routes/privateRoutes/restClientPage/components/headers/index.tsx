import { restClientPage } from '@/sources/messages/restClientPage';

import styles from './Headers.module.css';

export const Headers = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{restClientPage.table.headerKey}</th>
          <th>{restClientPage.table.headerValue}</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Keys</td>
          <td>Values</td>
        </tr>
      </tbody>
    </table>
  );
};
