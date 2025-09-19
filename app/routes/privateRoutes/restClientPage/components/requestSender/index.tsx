import {
  selectBody,
  selectHeaders,
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { selectVariables } from '@/store/slices/settings/selectors.ts';
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
import { Button } from '@/components/ui/button';
import { WaitingLoader } from '@/components/ui/waitingLoader';
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

  const fetcher = useFetcher();

  const isLoading =
    fetcher.state === LoaderStatus.SUBMITTING ||
    fetcher.state === LoaderStatus.LOADING;

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
        <HiddenRequestFields
          url={url}
          method={method}
          protocol={protocol}
          body={body}
          headers={headers}
          variables={variables}
        />

        <Button type={ButtonType.SUBMIT} disabled={!url}>
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
