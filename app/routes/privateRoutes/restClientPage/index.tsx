import { Outlet } from 'react-router';

import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './RestClientPage.module.css';
import { BodyEditor } from './components/bodyEditor';
import { Headers } from './components/headers';
import { UrlBox } from './components/urlBox';

export const meta = pageMeta(restClientMessages);

export default function RestClientPage() {
  return (
    <div className={styles.container}>
      <UrlBox />

      <Headers />

      <BodyEditor />

      <Outlet />
    </div>
  );
}
