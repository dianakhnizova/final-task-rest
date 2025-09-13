import { selectHeaders } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { InputID, InputType } from '@/sources/enums';

import { buttons as buttonMessages } from '@/sources/messages/buttons';
import { input as inputMessages } from '@/sources/messages/input';
import { restClientPage } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useActions } from '@/utils/hooks/useActions';

import styles from './Headers.module.css';

export const Headers = () => {
  const headers = useSelector(selectHeaders);
  const { addHeader, updateHeader, removeHeader } = useActions();

  const handleAddHeader = () => {
    addHeader();
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleAddHeader}>{buttonMessages.headers}</Button>

      {headers.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{restClientPage.table.headerKey}</th>
              <th>{restClientPage.table.headerValue}</th>
              <th>{restClientPage.table.headerDelete}</th>
            </tr>
          </thead>

          <tbody>
            {headers.map((header, index) => (
              <tr>
                <td>
                  <Input
                    id={`${InputID.ID_HEADER_KEY}_${index}`}
                    type={InputType.TEXT}
                    value={header.key}
                    setInput={value =>
                      updateHeader({ index, key: value, value: header.value })
                    }
                    placeholder={inputMessages.placeholder.key}
                    isHeader
                  />
                </td>
                <td>
                  <Input
                    id={`${InputID.ID_HEADER_VALUE}_${index}`}
                    type={InputType.TEXT}
                    value={header.value}
                    setInput={value =>
                      updateHeader({ index, key: header.key, value })
                    }
                    placeholder={inputMessages.placeholder.value}
                    isHeader
                  />
                </td>
                <td>
                  <Button onClick={() => removeHeader(index)}>
                    {buttonMessages.delete}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
