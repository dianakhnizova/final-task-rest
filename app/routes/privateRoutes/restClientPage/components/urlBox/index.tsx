import {
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { HttpMethods, InputID, InputType, Protocols } from '@/sources/enums';

import { buttons as buttonMessages } from '@/sources/messages/buttons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './UrlBox.module.css';
import {
  handleMethod,
  handleProtocol,
  handleServerFetch,
  handleUrl,
} from './handlers';
import { methodList } from './lists/methodList';
import { protocolList } from './lists/protocolList';

export const UrlBox = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const protocol = useSelector(selectProtocol);

  const { setMethod, setProtocol, setUrl } = useActions();
  const setSearchParams = useSearchParams()[1];

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

      <Button
        onClick={() =>
          handleServerFetch(url, method, protocol, setSearchParams)
        }
      >
        {buttonMessages.send}
      </Button>
    </div>
  );
};
