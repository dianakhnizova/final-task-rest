import { InputID, InputType, Methods } from '@/sources/enums';

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './UrlBox.module.css';
import { methodList } from './methodList';

export const UrlBox = () => {
  const { setMethod } = useActions();

  return (
    <div className={styles.container}>
      <Select
        defaultValue={methodList[0]}
        options={methodList}
        setSelectedValue={value => setMethod(value as Methods)}
      />

      <Input id={InputID.ID_URL} type={InputType.TEXT} />
    </div>
  );
};
