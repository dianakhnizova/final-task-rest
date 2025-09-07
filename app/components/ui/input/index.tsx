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
          {...register(name, {
            onChange: e => {
              setInput?.(e.target.value);
            },
          })}
          className={styles.input}
        />
      </div>

      {errorMessage && (
        <div className={styles.infoWrapper}>
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
};
