import {
  selectMethod,
  selectProtocol,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { InputID, InputType, Protocols } from '@/sources/enums';
import { methodList } from '@/sources/lists/methodList';
import { protocolList } from '@/sources/lists/protocolList';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useActions } from '@/utils/hooks/useActions';
import styles from './UrlBox.module.css';

export const UrlBox = () => {
  const { t } = useTranslation();

  const { setMethod, setProtocol, setUrl } = useActions();

  const method = useSelector(selectMethod);
  const protocol = useSelector(selectProtocol);
  const url = useSelector(selectUrl);

  const handleInputChange = (value: string) => {
    const match = value.match(/^(https?:\/\/)(.*)$/i);

    if (match) {
      const [, detectedProtocol, restUrl] = match;
      if (
        detectedProtocol === Protocols.HTTP ||
        detectedProtocol === Protocols.HTTPS
      ) {
        setProtocol(detectedProtocol);
      }
      setUrl(restUrl);
    } else {
      setUrl(value);
    }
  };

  return (
    <div className={styles.container}>
      <Select
        options={methodList}
        value={method}
        setSelectedValue={setMethod}
      />

      <Select
        options={protocolList}
        value={protocol}
        setSelectedValue={setProtocol}
      />

      <Input
        id={InputID.ID_URL}
        type={InputType.TEXT}
        placeholder={t('placeholder.url')}
        value={`${url}`}
        setInput={handleInputChange}
        containerClassName={styles.urlInputContainer}
      />
    </div>
  );
};
