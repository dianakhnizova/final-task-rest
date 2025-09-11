import type { FC, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import { WrapperId } from '@/sources/enums';

import styles from './wrapper.module.css';

interface WrapperProps extends PropsWithChildren {
  id?: string;
  className?: string;
}

export const Wrapper: FC<WrapperProps> = ({
  children,
  id = WrapperId.default,
  className = '',
}) => {
  return (
    <div id={id} className={clsx(styles.wrapper, className)}>
      {children}
    </div>
  );
};

export default Wrapper;
