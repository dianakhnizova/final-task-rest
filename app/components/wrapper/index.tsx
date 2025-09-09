import type { FC, PropsWithChildren } from 'react';

import styles from './wrapper.module.css';

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div id="wrapper" className={styles.wrapper}>
      {children}
    </div>
  );
};

export default Wrapper;
