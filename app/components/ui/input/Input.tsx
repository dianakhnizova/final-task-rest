import classNames from 'classnames';
import styles from './Input.module.css';
import type { FC } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  htmlFor?: string;
  label?: string;
  isCheckbox?: boolean;
  isRadio?: boolean;
  isLabel?: boolean;
  setInput?: (value: string) => void;
}

export const Input: FC<Props> = ({
  id,
  htmlFor,
  label,
  isCheckbox,
  isRadio,
  isLabel,
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
          onChange={handleInputChange}
          className={classNames(styles.input, {
            [styles.checkbox]: isCheckbox,
            [styles.radio]: isRadio,
          })}
        />
      </div>

      {isLabel && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};
