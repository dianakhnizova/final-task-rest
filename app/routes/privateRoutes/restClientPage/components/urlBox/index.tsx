import {
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import {
  HttpMethods,
  InputID,
  InputType,
  Protocols,
  SearchParams,
} from '@/sources/enums';

import { buttons as buttonMessages } from '@/sources/messages/buttons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './UrlBox.module.css';
import { handleMethod, handleProtocol, handleUrl } from './handlers';
import { methodList } from './lists/methodList';
import { protocolList } from './lists/protocolList';

export const UrlBox = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);

  const { setMethod, setProtocol, setUrl } = useActions();

  const setSearchParams = useSearchParams()[1];

  const handleServerFetch = async () => {
    if (!url) return;

    try {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set(SearchParams.URL, url);
      newSearchParams.set(SearchParams.METHOD, method);
      newSearchParams.set(SearchParams.PROTOCOL, protocol);

      setSearchParams(newSearchParams);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Select
        options={methodList}
        setSelectedValue={value =>
          handleMethod(value as HttpMethods | null, setMethod)
        }
      />

      <Select
        options={protocolList}
        setSelectedValue={value =>
          handleProtocol(value as Protocols | null, setProtocol)
        }
      />

      <Input
        id={InputID.ID_URL}
        type={InputType.TEXT}
        setInput={value => handleUrl(value, setUrl)}
      />

      <Button onClick={handleServerFetch}>{buttonMessages.send}</Button>
    </div>
  );
};
