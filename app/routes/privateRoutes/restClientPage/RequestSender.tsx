import {
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { buttons as buttonMessages } from '@/sources/messages/buttons';

import { Button } from '@/components/ui/button';

import { handleServerFetch } from './components/urlBox/handlers';

export const RequestSender = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);
  const setSearchParams = useSearchParams()[1];

  return (
    <Button
      onClick={() => handleServerFetch(url, method, protocol, setSearchParams)}
    >
      {buttonMessages.send}
    </Button>
  );
};
