import type { ChangeEvent, InputHTMLAttributes } from 'react';

import clsx from 'clsx';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './Input.module.css';

interface Props<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  id: string;
  label?: string;
  setInput?: (value: string) => void;
  name?: Path<T>;
  register?: UseFormRegister<T>;
  errorMessage?: string;
  containerClassName?: string;
  renderErrorMessage?: boolean;
}

export const Input = <T extends FieldValues>({
  id,
  label,
  setInput,
  name,
  register,
  errorMessage,
  className,
  containerClassName,
  renderErrorMessage = true,
  ...rest
}: Props<T>) => {
  const { onChange, ...restRegister } = register
    ? register(name as Path<T>)
    : {};

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput?.(event.target.value);
    onChange?.(event);
  };

  return (
    <div
      className={clsx(
        styles.container,
        containerClassName,
        renderErrorMessage && styles.containerWithErrorMessage
      )}
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
        className={clsx(className, styles.input)}
      />

      {errorMessage && renderErrorMessage && (
        <p className={styles.error}>{errorMessage}</p>
      )}
    </div>
  );
};
