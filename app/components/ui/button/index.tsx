import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';

import clsx from 'clsx';

import { DisplayName, Variant } from '@/sources/enums.ts';

import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children?: ReactNode;
}

export const Button: FC<Props> = ({
  variant = Variant.PRIMARY,
  className,
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = DisplayName.BUTTON;
