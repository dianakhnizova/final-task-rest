import { type FC, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { EditableField } from '@/sources/enums';
import type { KeyValue } from '@/sources/interfaces.ts';
import { keyValueEditor as messages } from '@/sources/messages/keyValueEditor.ts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import styles from './KeyValueEditor.module.css';

export interface Props {
  keyHeader: string;
  valueHeader: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  keyValues: KeyValue[];
  onAdd: (newValue: KeyValue) => void;
  onDelete: (uid: number) => void;
  onUpdate: (updatedValue: KeyValue) => void;
}

export const KeyValueEditor: FC<Props> = ({
  keyHeader,
  valueHeader,
  keyValues,
  onAdd,
  onDelete,
  onUpdate,
  keyPlaceholder = messages.keyPlaceholder,
  valuePlaceholder = messages.valuePlaceholder,
}) => {
  const { t } = useTranslation();
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
            <th>{keyHeader}</th>
            <th>{valueHeader}</th>
            <th>
              <Button className={styles.addButton} onClick={handleAdd}>
                {t('keyValueEditor.add')}
              </Button>
            </th>
          </tr>
        </thead>

        <tbody>
          {keyValues.length === 0 && (
            <tr>
              <td colSpan={3} className={styles.title}>
                {t('keyValueEditor.emptyMessage')}
              </td>
            </tr>
          )}

          {keyValues.map(keyValue => (
            <tr key={keyValue.id}>
              <td>
                <Input
                  {...buildInput(keyValue, EditableField.KEY)}
                  placeholder={keyPlaceholder}
                />
              </td>
              <td>
                <Input
                  {...buildInput(keyValue, EditableField.VALUE)}
                  placeholder={valuePlaceholder}
                />
              </td>
              <td>
                <Button onClick={() => handleDelete(keyValue.id)}>
                  {t('keyValueEditor.delete')}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
