import {
  selectBody,
  selectHeaders,
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { selectVariables } from '@/store/slices/settings/selectors.ts';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { buttons as buttonMessages } from '@/sources/messages/buttons';

import { Button } from '@/components/ui/button';

import { handleServerFetch } from './components/urlBox/handlers';

export const RequestSender = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);
  const body = useSelector(selectBody);
  const headers = useSelector(selectHeaders);

  const setSearchParams = useSearchParams()[1];

  const variables = useSelector(selectVariables);

  return (
    <Button
      onClick={() =>
        handleServerFetch(
          url,
          method,
          protocol,
          body,
          headers,
          setSearchParams,
          variables
        )
      }
      disabled={!url}
    >
      {buttonMessages.send}
    </Button>
  );
};
