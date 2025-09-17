import {
  selectBody,
  selectHeaders,
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { selectVariables } from '@/store/slices/settings/selectors.ts';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useFetcher } from 'react-router';

import {
  AppRoutes,
  ButtonType,
  HttpMethods,
  LoaderStatus,
} from '@/sources/enums';

import { inputFetchFields } from '@/sources/lists/inputFetchFields';
import { buttons as buttonMessages } from '@/sources/messages/buttons';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';
import { WaitingLoader } from '@/components/ui/waitingLoader';

import { Response } from '../response';

export const RequestSender = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);
  const body = useSelector(selectBody);
  const headers = useSelector(selectHeaders);
  const variables = useSelector(selectVariables);

  const fetcher = useFetcher();

  const fields = inputFetchFields({
    url,
    method,
    protocol,
    body,
    headers,
    variables,
  });

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
        onSubmit={() => {}}
      >
        {fields.map(field => (
          <input
            key={field.id}
            id={field.id}
            type={field.type}
            name={field.name}
            value={field.value}
          />
        ))}

        <Button type={ButtonType.SUBMIT} disabled={!url}>
          {buttonMessages.send}
        </Button>
      </fetcher.Form>

      {isLoading ? (
        <WaitingLoader />
      ) : fetcher.data ? (
        <>
          <p>{restClientMessages.response.title}</p>
          <Response data={fetcher.data.received} status={fetcher.data.status} />
        </>
      ) : (
        <p>{restClientMessages.response.emptyRequestHint}</p>
      )}
    </>
  );
};
