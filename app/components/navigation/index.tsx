import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { buttonsConfig } from '@/components/navigation/handlers';
import { Button } from '../ui/button';
import styles from './navigation.module.css';

interface Props {
  isRestClientPage?: boolean;
}

export const Navigation: FC<Props> = ({ isRestClientPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buttons = buttonsConfig(t, isRestClientPage);

  return (
    <section className={styles.btnSection}>
      {buttons.map(({ path, label }) => (
        <Button key={label} onClick={() => navigate(path)}>
          {label}
        </Button>
      ))}
    </section>
  );
};
