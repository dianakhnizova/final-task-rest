import clsx from 'clsx';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './Input.module.css';

interface Props<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  id: string;
  label?: string;
  setInput?: (value: string) => void;
  name?: Path<T>;
  register?: UseFormRegister<T>;
  errorMessage?: string;
  isHeader?: boolean;
}

export const Input = <T extends FieldValues>({
  id,
  label,
  setInput,
  name,
  register,
  errorMessage,
  isHeader,
  ...rest
}: Props<T>) => {
  const { onChange, ...restRegister } = register
    ? register(name as Path<T>)
    : {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput?.(event.target.value);
    onChange?.(event);
  };

  return (
    <div
      className={clsx(styles.container, {
        [styles.urlContainer]: !label,
        [styles.headerContainer]: isHeader,
      })}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        {...rest}
        {...restRegister}
        onChange={handleChange}
        className={styles.input}
      />

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
