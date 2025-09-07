import type { ReactNode } from 'react';
import styles from './wrapper.module.css';

type Props = {
  children: ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }: Props) => {
  return (
    <div id="wrapper" className={styles.wrapper}>
      {children}
    </div>
  );
};

export default Wrapper;
