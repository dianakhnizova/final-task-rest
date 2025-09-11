import { InputID, InputType } from '@/sources/enums';

import { restClientPage } from '@/sources/messages/restClientPage';

import { Input } from '@/components/ui/input';

import styles from './UrlBox.module.css';

export const UrlBox = () => {
  return (
    <Input
      id={InputID.ID_URL}
      label={restClientPage.url.title}
      type={InputType.TEXT}
      className={styles.urlInput}
    />
  );
};
