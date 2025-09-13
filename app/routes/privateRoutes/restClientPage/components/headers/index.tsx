import { buttons as buttonMessages } from '@/sources/messages/buttons';
import { restClientPage } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';

import styles from './Headers.module.css';

export const Headers = () => {
  return (
    <>
      <Button>{buttonMessages.headers}</Button>

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
    </>
  );
};
