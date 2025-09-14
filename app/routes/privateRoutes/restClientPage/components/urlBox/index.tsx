import { HttpMethods, InputID, InputType, Protocols } from '@/sources/enums';

import { input as inputMessages } from '@/sources/messages/input';

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './UrlBox.module.css';
import { handleMethod, handleProtocol, handleUrl } from './handlers';
import { methodList } from './lists/methodList';
import { protocolList } from './lists/protocolList';

export const UrlBox = () => {
  const { setMethod, setProtocol, setUrl } = useActions();

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
        placeholder={inputMessages.placeholder.url}
        setInput={value => handleUrl(value, setUrl)}
        containerClassName={styles.urlInputContainer}
      />
    </div>
  );
};
