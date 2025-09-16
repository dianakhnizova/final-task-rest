import type { Parsers } from '@/sources/enums';

import { parserList } from '@/sources/lists/parserList';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './Parser.module.css';

export const Parser = () => {
  const { setParser } = useActions();

  const handleParser = (value: Parsers | null) => {
    if (value) setParser(value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{restClientMessages.response.selectParser}</p>

      <Select options={parserList} setSelectedValue={handleParser} />
    </div>
  );
};
