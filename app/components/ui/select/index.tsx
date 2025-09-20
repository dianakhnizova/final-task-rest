import styles from './Select.module.css';

interface Props<T extends string | number> {
  setSelectedValue: (value: T) => void;
  options: T[];
  defaultValue?: string | number;
}

export const Select = <T extends string | number>({
  setSelectedValue,
  options,
  defaultValue,
}: Props<T>) => {
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as T;

    setSelectedValue(value);
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
