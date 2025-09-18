import type { FC } from 'react';

import { useNavigate } from 'react-router';

import { mainPage as mainPageMessages } from '@/sources/messages/mainPage';

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
  const navigate = useNavigate();

  const buttons = isRestClientPage
    ? [
        {
          handler: () => handleHistory(navigate),
          label: mainPageMessages.btnHistory,
        },
        {
          handler: () => handleVariables(navigate),
          label: mainPageMessages.btnVariables,
        },
      ]
    : [
        {
          handler: () => handleRestClient(navigate),
          label: mainPageMessages.btnRestClient,
        },
        {
          handler: () => handleHistory(navigate),
          label: mainPageMessages.btnHistory,
        },
        {
          handler: () => handleVariables(navigate),
          label: mainPageMessages.btnVariables,
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
