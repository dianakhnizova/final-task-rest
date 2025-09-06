import classNames from 'classnames';
import styles from './Button.module.css';
import { type ButtonHTMLAttributes } from 'react';
import { Variant } from '../../../sources/enums';

type Props = {
  variant?: Variant;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
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
