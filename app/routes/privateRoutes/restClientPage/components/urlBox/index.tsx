import { HttpMethods, InputID, InputType } from '@/sources/enums';

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './UrlBox.module.css';
import { methodList } from './methodList';

export const UrlBox = () => {
  const { setMethod, setUrl } = useActions();

  const handleMethod = (value: HttpMethods | null) => {
    if (value) setMethod(value);
  };

  const handleUrl = (value: string) => {
    setUrl(value);
  };

  return (
    <div className={styles.container}>
      <Select
        defaultValue={methodList[0]}
        options={methodList}
        setSelectedValue={handleMethod}
      />

      <Input id={InputID.ID_URL} type={InputType.TEXT} setInput={handleUrl} />
    </div>
  );
};
