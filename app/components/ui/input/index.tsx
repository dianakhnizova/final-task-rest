import type { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.css';
import type { UserForm } from '@/sources/interfaces';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  setInput?: (value: string) => void;
  name: keyof UserForm;
  register: UseFormRegister<UserForm>;
  errorMessage?: string;
}

export const Input: React.FC<Props> = ({
  id,
  label,
  setInput,
  name,
  register,
  errorMessage,
  ...rest
}) => {
  const { onChange, ...restRegister } = register(name);

  return (
    <>
      <div className={styles.container}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}

        <input
          id={id}
          {...rest}
          {...restRegister}
          onChange={event => {
            setInput?.(event.target.value);
            onChange(event);
          }}
          className={styles.input}
        />

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </>
  );
};
