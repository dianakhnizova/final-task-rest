import type { ChangeEvent } from 'react';
import styles from './Select.module.css';

interface Props<T extends string | number> {
  setSelectedValue: (value: T) => void;
  options: T[];
  defaultValue?: string | number;
  value?: T;
}

export const Select = <T extends string | number>({
  setSelectedValue,
  options,
  defaultValue,
  value,
}: Props<T>) => {
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as T;
    setSelectedValue(value);
  };

  return (
    <select
      onChange={onSelect}
      className={styles.select}
      defaultValue={defaultValue}
      value={value}
    >
      {defaultValue && <option value="">{defaultValue}</option>}
      {options.map(option => (
        <option key={option} value={option} className={styles.option}>
          {option}
        </option>
      ))}
    </select>
  );
};
