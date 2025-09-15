import {
  selectBody,
  selectHeaders,
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { buttons as buttonMessages } from '@/sources/messages/buttons';

import { Button } from '@/components/ui/button';

import { useActions } from '@/utils/hooks/useActions';

import { handleSendRequest } from './handleSendRequest';

export const RequestSender = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);
  const body = useSelector(selectBody);
  const headers = useSelector(selectHeaders);

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
