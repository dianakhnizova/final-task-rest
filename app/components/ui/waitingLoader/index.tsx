import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DisplayName } from '@/sources/enums';
import { images as imageMessages } from '@/sources/messages/images';
import LoaderIcon from '@/components/icons/loader.gif';
import styles from './WaitingLoader.module.css';

export const WaitingLoader: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.loaderContainer}>
      <img
        data-testid="waiting-loader"
        className={styles.loader}
        src={LoaderIcon}
        alt={imageMessages.loading}
      />
      <div className={styles.loading}>{t('loader.title')}</div>
    </div>
  );
};

WaitingLoader.displayName = DisplayName.LOADER;
