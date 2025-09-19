import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  handleHistory,
  handleRestClient,
  handleVariables,
} from '@/components/navigation/handlers';
import { Button } from '../ui/button';
import styles from './Navigation.module.css';

interface Props {
  isRestClientPage?: boolean;
}

export const Navigation: FC<Props> = ({ isRestClientPage }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const buttons = isRestClientPage
    ? [
        {
          handler: () => handleHistory(navigate),
          label: t('mainPage.btnHistory'),
        },
        {
          handler: () => handleVariables(navigate),
          label: t('mainPage.btnVariables'),
        },
      ]
    : [
        {
          handler: () => handleRestClient(navigate),
          label: t('mainPage.btnRestClient'),
        },
        {
          handler: () => handleHistory(navigate),
          label: t('mainPage.btnHistory'),
        },
        {
          handler: () => handleVariables(navigate),
          label: t('mainPage.btnVariables'),
        },
      ];

  return (
    <section className={styles.btnSection}>
      {buttons.map(({ handler, label }) => (
        <Button key={label} onClick={handler}>
          {label}
        </Button>
      ))}
    </section>
  );
};
