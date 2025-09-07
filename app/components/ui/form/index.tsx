import styles from './Form.module.css';
import { ButtonType } from '@/sources/enums';
import { Button } from '../button/Button';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  buttonLabel?: string;
}

export const Form: React.FC<Props> = ({
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
