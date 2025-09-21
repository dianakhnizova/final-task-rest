import { addHistoryForCurrentUser } from '@/services/historyService.ts';
import {
  selectBody,
  selectClientState,
  selectHeaders,
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { selectVariables } from '@/store/slices/settings/selectors.ts';
import { supabase } from '@/supabaseClient.ts';
import type { RequestData, ServerFetchResponse } from '@/types/requestData.ts';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFetcher } from 'react-router';
import {
  AppRoutes,
  ButtonType,
  HttpMethods,
  LoaderStatus,
} from '@/sources/enums';
import { Button } from '@/components/ui/button';
import { WaitingLoader } from '@/components/ui/waitingLoader';
import { getFinalUrlParams } from '@/utils/fetch/getFinalUrlParams';
import { Response } from '../response';
import styles from './RequestSender.module.css';
import { HiddenRequestFields } from './hiddenRequestFields';

export const RequestSender = () => {
  const { t } = useTranslation();

  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);
  const body = useSelector(selectBody);
  const headers = useSelector(selectHeaders);
  const variables = useSelector(selectVariables);
  const clientState = useSelector(selectClientState);
  const clientStateRef = useRef(clientState);

  useEffect(() => {
    clientStateRef.current = clientState;
  }, [clientState]);

  const requestData: RequestData = {
    clientState,
    globalVariables: variables,
  };

  const requestDataJson = JSON.stringify(requestData);

  const fetcher = useFetcher<ServerFetchResponse>();

  const isLoading =
    fetcher.state === LoaderStatus.SUBMITTING ||
    fetcher.state === LoaderStatus.LOADING;

  const canSend = !!clientState.url && !!method;

  useEffect(() => {
    if (fetcher.state === LoaderStatus.SUBMITTING) {
      const fullUrl = `${protocol}${url}`;
      const bodyString =
        body && typeof body === 'object'
          ? JSON.stringify(body)
          : (body ?? null);
      const headersForUrl =
        headers?.map((header, index) => ({
          id: index,
          key: header.key,
          value: header.value,
        })) ?? [];

      const finalUrl = getFinalUrlParams(
        bodyString,
        method,
        headersForUrl,
        fullUrl
      );
      window.history.replaceState(null, '', finalUrl);
    }
  }, [fetcher.state, body, method, headers, protocol, url]);

  useEffect(() => {
    if (fetcher.data?.ok && fetcher.data.finalUrl) {
      const { responseMetrics, requestDetails, status } = fetcher.data;
      const currentClientState = clientStateRef.current;

      addHistoryForCurrentUser(supabase, {
        clientState: JSON.stringify(currentClientState),
        method: requestDetails.method ?? currentClientState.method,
        url: requestDetails.url ?? currentClientState.url,
        user_id: '',
        status: status,
        timestamp: requestDetails.timestamp.toISOString(),
        latency_ms: responseMetrics?.latencyMs,
        requestSize: responseMetrics?.requestSize,
        responseSize: responseMetrics?.responseSize,
      }).catch(console.error);

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
        <HiddenRequestFields
          url={url}
          method={method}
          protocol={protocol}
          body={body}
          headers={headers}
          variables={variables}
          requestDataJson={requestDataJson}
        />

        <Button type={ButtonType.SUBMIT} disabled={!canSend}>
          {t('buttons.send')}
        </Button>
      </fetcher.Form>

      {isLoading ? (
        <WaitingLoader />
      ) : fetcher.data ? (
        fetcher.data.ok ? (
          <div className={styles.response}>
            <p>{t('response.title')}</p>
            <Response
              data={fetcher.data.received}
              status={fetcher.data.status}
            />
          </div>
        ) : (
          <div className={styles.error}>
            <p className={styles.error}>
              {t('response.errorTitle', { defaultValue: 'Error' })}
            </p>
            <pre>{fetcher.data.error}</pre>
          </div>
        )
      ) : (
        <p>{t('response.emptyRequestHint')}</p>
      )}
    </>
  );
};
