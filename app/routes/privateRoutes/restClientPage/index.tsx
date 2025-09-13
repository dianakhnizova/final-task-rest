import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import styles from './RestClientPage.module.css';
import { Body } from './components/body';
import { Headers } from './components/headers';
import { Response } from './components/response';
import { UrlBox } from './components/urlBox';

export function meta() {
  return [
    { title: restClientMessages.metaTitle },
    {
      name: restClientMessages.metaName,
      content: restClientMessages.metaContent,
    },
  ];
}

export default function RestClientPage() {
  return (
    <div className={styles.container}>
      <UrlBox />

      <Headers />

      <Body />

      <Response />
    </div>
  );
}
