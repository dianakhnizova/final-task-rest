import classNames from 'classnames';
import styles from './Button.module.css';
import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';
import { Variant } from '@/sources/enums.ts';

type Props = {
  variant?: Variant;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  variant = Variant.PRIMARY,
  className,
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={classNames(styles.button, styles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
