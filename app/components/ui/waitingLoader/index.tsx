import type { FC } from 'react';

import { DisplayName } from '@/sources/enums';

import LoaderIcon from '@/components/icons/loader.gif';

import styles from './waitingLoader.module.css';

export const WaitingLoader: FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.loader} src={LoaderIcon} alt="Loading data" />
      <div className={styles.loading}>Loading data...</div>
    </div>
  );
};

WaitingLoader.displayName = DisplayName.LOADER;
