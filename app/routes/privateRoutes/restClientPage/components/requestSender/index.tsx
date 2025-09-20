import { REQUEST_DATA_NAME } from '@/routes/privateRoutes/restClientPage/components/requestSender/RequestSender.constants.ts';
import { selectClientState } from '@/store/slices/restClient/selectors';
import { selectVariables } from '@/store/slices/settings/selectors.ts';
import type { RequestData } from '@/types/requestData.ts';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFetcher } from 'react-router';

import {
  AppRoutes,
  ButtonType,
  HttpMethods,
  LoaderStatus,
} from '@/sources/enums';

import { buttons as buttonMessages } from '@/sources/messages/buttons';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';
import { WaitingLoader } from '@/components/ui/waitingLoader';

import { Response } from '../response';
import styles from './RequestSender.module.css';

export const RequestSender = () => {
    const { t } = useTranslation();


    const clientState = useSelector(selectClientState);
  const variables = useSelector(selectVariables);

  const requestData: RequestData = {
    clientState,
    globalVariables: variables,
  };

  const json = JSON.stringify(requestData);

  const fetcher = useFetcher();

  const isLoading =
    fetcher.state === LoaderStatus.SUBMITTING ||
    fetcher.state === LoaderStatus.LOADING;

  const canSend = clientState.url;

  useEffect(() => {
    if (fetcher.data?.ok && fetcher.data.finalUrl) {
      window.history.replaceState(null, '', fetcher.data.finalUrl);
    }
  }, [fetcher.data]);

  return (
    <>
      <fetcher.Form
        action={AppRoutes.FETCH}
        method={HttpMethods.POST}
        className={styles.form}
      >
        <input
          id={REQUEST_DATA_NAME}
          name={REQUEST_DATA_NAME}
          type="hidden"
          value={json}
          readOnly
          hidden
        />

        <Button type={ButtonType.SUBMIT} disabled={!canSend}>
            {t('buttons.send')}
        </Button>
      </fetcher.Form>

      {isLoading ? (
        <WaitingLoader />
      ) : fetcher.data ? (
        <div className={styles.response}>
          <p>{t('response.title')}</p>

          <Response data={fetcher.data.received} status={fetcher.data.status} />
        </div>
      ) : (
        <p>{t('response.emptyRequestHint')}</p>
      )}
    </>
  );
};
