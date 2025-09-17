import {
  selectBody,
  selectHeaders,
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { selectVariables } from '@/store/slices/settings/selectors.ts';

import { useSelector } from 'react-redux';
import { useFetcher } from 'react-router';

import { ButtonType, CodeVariant, HttpMethods } from '@/sources/enums';

import { buttons as buttonMessages } from '@/sources/messages/buttons';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';
import { inputFetchFields } from '@/components/ui/input/inputFetchFields';
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
    fetcher.state === 'submitting' || fetcher.state === 'loading';

  return (
    <>
      <fetcher.Form action={CodeVariant.FETCH} method={HttpMethods.POST}>
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
