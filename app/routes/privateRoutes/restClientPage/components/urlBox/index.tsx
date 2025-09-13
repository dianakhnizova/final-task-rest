import { selectMethod, selectUrl } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { HttpMethods, InputID, InputType } from '@/sources/enums';

import { buttons as buttonMessages } from '@/sources/messages/buttons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './UrlBox.module.css';
import { handleMethod, handleSend, handleUrl } from './handlers';
import { methodList } from './methodList';

export const UrlBox = () => {
  const method = useSelector(selectMethod);
  const url = useSelector(selectUrl);
  const { setMethod, setUrl, setResponse } = useActions();

  return (
    <div className={styles.container}>
      <Select
        defaultValue={methodList[0]}
        options={methodList}
        setSelectedValue={value =>
          handleMethod(value as HttpMethods | null, setMethod)
        }
      />

      <Input
        id={InputID.ID_URL}
        type={InputType.TEXT}
        setInput={value => handleUrl(value, setUrl)}
      />

      <Button onClick={() => handleSend(url, method, setResponse)}>
        {buttonMessages.send}
      </Button>
    </div>
  );
};
