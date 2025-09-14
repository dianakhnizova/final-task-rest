import { Outlet } from 'react-router';

import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { pageMeta } from '@/utils/metaHelpers.ts';

import { RequestSender } from './RequestSender';
import styles from './RestClientPage.module.css';
import { BodyEditor } from './components/bodyEditor';
import { Headers } from './components/headers';
import { Parser } from './components/parser';
import { UrlBox } from './components/urlBox';

export const meta = pageMeta(restClientMessages);

export default function RestClientPage() {
  return (
    <div className={styles.container}>
      <div className={styles.restRequestContainer}>
        <UrlBox />

        <Headers />

        <BodyEditor />

        <Parser />

        <RequestSender />
      </div>

      <Outlet />
    </div>
  );
}
