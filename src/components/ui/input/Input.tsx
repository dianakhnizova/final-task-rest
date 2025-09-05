import styles from './Input.module.css';
import type { FC } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  setInput?: (value: string) => void;
}

export const Input: FC<Props> = ({
  id,
  label,
  setInput,
  onChange,
  ...rest
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInput?.(value);
    onChange?.(event);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          {...rest}
          className={styles.input}
          onChange={handleInputChange}
        />
      </div>

      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};
