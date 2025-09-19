import { useTranslation } from 'react-i18next';
import type { Parsers } from '@/sources/enums';
import { parserList } from '@/sources/lists/parserList';
import { Select } from '@/components/ui/select';
import { useActions } from '@/utils/hooks/useActions';
import styles from './Parser.module.css';

export const Parser = () => {
  const { t } = useTranslation();
  const { setParser } = useActions();

  const handleParser = (value: Parsers | null) => {
    if (value) setParser(value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{t('response.selectParser')}</p>

      <Select options={parserList} setSelectedValue={handleParser} />
    </div>
  );
};
