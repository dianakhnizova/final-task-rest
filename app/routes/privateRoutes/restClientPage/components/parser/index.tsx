import type { Parsers } from '@/sources/enums';

import { serverFetch as serverMessages } from '@/sources/messages/serverFetch';

import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import styles from './Parser.module.css';
import { parserList } from './parserList';

export const Parser = () => {
  const { setParser } = useActions();

  const handleParser = (value: Parsers | null) => {
    if (value) setParser(value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{serverMessages.selectParser}</p>

      <Select options={parserList} setSelectedValue={handleParser} />
    </div>
  );
};
