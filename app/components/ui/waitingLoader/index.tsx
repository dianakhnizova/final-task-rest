import type { FC } from 'react';

import { DisplayName } from '@/sources/enums';

import { images as imageMessages } from '@/sources/messages/images';
import { loader as loaderMessages } from '@/sources/messages/loader';

import LoaderIcon from '@/components/icons/loader.gif';

import styles from './WaitingLoader.module.css';

export const WaitingLoader: FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <img
        className={styles.loader}
        src={LoaderIcon}
        alt={imageMessages.loading}
      />
      <div className={styles.loading}>{loaderMessages.title}</div>
    </div>
  );
};

WaitingLoader.displayName = DisplayName.LOADER;
