import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './RestClientPage.module.css';
import { BodyEditor } from './components/bodyEditor';
import { CodeGenerator } from './components/codeGenerator';
import { Headers } from './components/headers';
// import { Parser } from './components/parser';
import { RequestSender } from './components/requestSender/RequestSender';
import { UrlBox } from './components/urlBox';

export const meta = pageMeta(restClientMessages);

export default function RestClientPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <UrlBox />

        <Headers />

        <CodeGenerator />

        <BodyEditor />

        <RequestSender />
      </div>
    </div>
  );
}
