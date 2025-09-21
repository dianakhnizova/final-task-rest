import { AppRoutes } from '@/sources/enums';

export const buttonsConfig = (
  t: (key: string) => string,
  isRestClientPage?: boolean
) =>
  isRestClientPage
    ? [
        { path: AppRoutes.HISTORY, label: t('buttons.btnHistory') },
        { path: AppRoutes.VARIABLES, label: t('buttons.btnVariables') },
      ]
    : [
        { path: AppRoutes.REST_CLIENT, label: t('buttons.btnRestClient') },
        { path: AppRoutes.HISTORY, label: t('buttons.btnHistory') },
        { path: AppRoutes.VARIABLES, label: t('buttons.btnVariables') },
      ];
