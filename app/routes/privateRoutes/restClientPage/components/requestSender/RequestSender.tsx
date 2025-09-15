import {
  selectBody,
  selectHeaders,
  selectLanguage,
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { selectVariables } from '@/store/slices/settings/selectors.ts';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { buttons as buttonMessages } from '@/sources/messages/buttons';

import { Button } from '@/components/ui/button';

import { useActions } from '@/utils/hooks/useActions';

import { handleSendRequest } from './handlers';

export const RequestSender = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);
  const body = useSelector(selectBody);
  const headers = useSelector(selectHeaders);
  const variables = useSelector(selectVariables);
  const language = useSelector(selectLanguage);

  const { setCode } = useActions();
  const setSearchParams = useSearchParams()[1];

  return (
    <Button
      onClick={() =>
        handleSendRequest(
          url,
          method,
          protocol,
          body,
          headers,
          variables,
          language,
          setSearchParams,
          setCode
        )
      }
      disabled={!url}
    >
      {buttonMessages.send}
    </Button>
  );
};
