import { type FC, useId } from 'react';

import type { KeyValue } from '@/sources/interfaces.ts';
import { keyValueEditor as messages } from '@/sources/messages/keyValueEditor.ts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import styles from './KeyValueEditor.module.css';

export interface Props {
  keyValues: KeyValue[];
  onAdd: (newValue: KeyValue) => void;
  onDelete: (uid: number) => void;
  onUpdate: (updatedValue: KeyValue) => void;
}

const enum EditableField {
  KEY = 'key',
  VALUE = 'value',
}

export const KeyValueEditor: FC<Props> = ({
  keyValues,
  onAdd,
  onDelete,
  onUpdate,
}) => {
  const id = useId();

  const handleAdd = () => {
    onAdd({
      id: Math.max(...keyValues.map(pair => pair.id), 0) + 1,
      key: '',
      value: '',
    });
  };

  const handleDelete = (uid: number) => {
    onDelete(uid);
  };

  const handleChange = (uid: number, handler: (pair: KeyValue) => KeyValue) => {
    const index = keyValues.findIndex(pair => pair.id === uid);
    const updatedValue = handler(keyValues[index]);

    onUpdate(updatedValue);
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
                {messages.add}
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {keyValues.length === 0 && (
            <tr>
              <td colSpan={3}>{messages.emptyMessage}</td>
            </tr>
          )}

          {keyValues.map(keyValue => (
            <tr key={keyValue.id}>
              <td>
                <Input {...buildInput(keyValue, EditableField.KEY)} />
              </td>
              <td>
                <Input {...buildInput(keyValue, EditableField.VALUE)} />
              </td>
              <td>
                <Button onClick={() => handleDelete(keyValue.id)}>
                  {messages.delete}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
