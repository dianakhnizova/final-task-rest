import type { FC } from 'react';

import styles from './Select.module.css';

interface Props {
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
  options: (number | string)[];
  defaultValue?: string | number;
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
    <select
      defaultValue={defaultValue}
      onChange={onSelect}
      className={styles.select}
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
