import { selectMethod, selectUrl } from '@/store/slices/restClient/selectors';

import { useState } from 'react';

import { useSelector } from 'react-redux';

import { ErrorCode } from '@/sources/enums';

import { buttons as buttonMessages } from '@/sources/messages/buttons';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';

import fetchData from '@/utils/fetch';

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
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);

  console.log(url);
  const [status, setStatus] = useState<number | null>(null);
  const [body, setBody] = useState<string | null>(null);

  const handleSend = async () => {
    const { error, data } = await fetchData(url, method);

    if (error) {
      setStatus(null);
      setBody(error);
    } else {
      setStatus(ErrorCode.OK);
      setBody(JSON.stringify(data, null, 2));
    }
  };

  return (
    <div className={styles.container}>
      <UrlBox />

      <Button onClick={handleSend}>{buttonMessages.headers}</Button>

      <Headers />

      <Body />

      <Response status={status} body={body} />
    </div>
  );
}
