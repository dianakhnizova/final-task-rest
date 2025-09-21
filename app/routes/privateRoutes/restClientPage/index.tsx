import type { HistoryRecord } from '@/routes/privateRoutes/historyPage';
import type { RestClientState } from '@/store/slices/restClient/restClient.slice.ts';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';
import { Navigation } from '@/components/navigation';
import { useActions } from '@/utils/hooks/useActions.ts';
import { pageMeta } from '@/utils/metaHelpers.ts';
import styles from './RestClientPage.module.css';
import { BodyEditor } from './components/bodyEditor';
import { CodeGenerator } from './components/codeGenerator';
import { Headers } from './components/headers';
import { Parser } from './components/parser';
import { RequestSender } from './components/requestSender';
import { UrlBox } from './components/urlBox';

export const meta = pageMeta(restClientMessages);

export default function RestClientPage() {
  const { setState } = useActions();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.history) return;

    const history = location.state.history as HistoryRecord;

    const parsedState = JSON.parse(
      history.clientState as string
    ) as RestClientState;

    console.log(parsedState);

    setState(parsedState);
  }, [location.state, setState]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Navigation isRestClientPage />

        <UrlBox />

        <Headers />

        <CodeGenerator />

        <Parser />

        <BodyEditor />

        <RequestSender />
      </div>
    </div>
  );
}
