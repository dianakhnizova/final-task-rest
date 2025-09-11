import { buttons as buttonMessages } from '@/sources/messages/buttons';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';

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

      <Button>{buttonMessages.headers}</Button>

      <Headers />

      <Body />

      <Response />
    </div>
  );
}
