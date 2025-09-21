import type { FC, ReactNode } from 'react';
import { ButtonType } from '@/sources/enums';
import { Button } from '../button';
import styles from './form.module.css';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  isDisabled?: boolean;
  buttonLabel?: string;
}

export const Form: FC<Props> = ({
  onSubmit,
  children,
  isDisabled,
  buttonLabel,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.container}>{children}</div>

      <Button type={ButtonType.SUBMIT} disabled={isDisabled}>
        {buttonLabel}
      </Button>
    </form>
  );
};
