import type { FC } from 'react';
import styles from './Select.module.scss';

interface Props {
  setSelectedValue: (value: string | null) => void;
  options: (number | string)[];
  defaultValue?: string | number | null;
}

export const Select: FC<Props> = ({
  setSelectedValue,
  options,
  defaultValue,
}) => {
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedValue(value || null);
  };

  return (
    <select defaultValue="" onChange={onSelect} className={styles.select}>
      {defaultValue && <option value="">{defaultValue}</option>}

      {options.map(option => (
        <option key={option} value={option} className={styles.option}>
          {option}
        </option>
      ))}
    </select>
  );
};
