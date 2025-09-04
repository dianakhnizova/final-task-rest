import classNames from 'classnames';
import styles from './Button.module.css';
import {
  type ButtonHTMLAttributes,
  type FC,
  memo,
  type ReactNode,
} from 'react';
import { Variant } from '../../../sources/enums';

type Props = {
  variant?: Variant;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = memo(
  ({ variant = Variant.PRIMARY, className, children, ...rest }: Props) => {
    return (
      <button
        className={classNames(styles.button, styles[variant], className)}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
