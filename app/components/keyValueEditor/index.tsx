import { type FC, useId } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import styles from './KeyValueEditor.module.css';

export interface KeyValue {
  id: number;
  key: string;
  value: string;
}

export interface Props {
  keyValues: KeyValue[];
  onChange: (newValues: KeyValue[]) => void;
}

type EditableField = 'key' | 'value';

export const KeyValueEditor: FC<Props> = ({ keyValues, onChange }) => {
  const id = useId();

  const handleAdd = () => {
    onChange([
      ...keyValues,
      {
        id: Math.max(...keyValues.map(pair => pair.id), 0) + 1,
        key: '',
        value: '',
      },
    ]);
  };

  const handleDelete = (uid: number) => {
    const newValues = keyValues.filter(pair => pair.id !== uid);
    onChange(newValues);
  };

  const handleChange = (uid: number, handler: (pair: KeyValue) => KeyValue) => {
    const newValues = [...keyValues];
    const index = newValues.findIndex(pair => pair.id === uid);
    newValues[index] = handler(newValues[index]);
    onChange(newValues);
  };

  const getChangeHandler =
    (pair: KeyValue, field: EditableField) => (value: string) => {
      handleChange(pair.id, pair => ({ ...pair, [field]: value }));
    };

  const buildInput = (pair: KeyValue, field: EditableField) => ({
    id: `${id}-${pair.id}-${field}`,
    value: pair[field],
    setInput: getChangeHandler(pair, field),
    renderErrorMessage: false,
    className: styles.input,
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <colgroup>
          <col />
          <col />
          <col width={0} />
        </colgroup>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>
              <Button className={styles.addButton} onClick={handleAdd}>
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {keyValues.length === 0 && (
            <tr>
              <td colSpan={3}>Click the "Add" button to add a value</td>
            </tr>
          )}

          {keyValues.map((keyValue, index) => (
            <tr key={index}>
              <td>
                <Input {...buildInput(keyValue, 'key')} />
              </td>
              <td>
                <Input {...buildInput(keyValue, 'value')} />
              </td>
              <td>
                <Button onClick={() => handleDelete(keyValue.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
