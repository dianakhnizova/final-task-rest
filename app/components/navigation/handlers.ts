import { AppRoutes } from '@/sources/enums';

export const buttonsConfig = (
  t: (key: string) => string,
  isRestClientPage?: boolean
) =>
  isRestClientPage
    ? [
        { path: AppRoutes.HISTORY, label: t('mainPage.btnHistory') },
        { path: AppRoutes.VARIABLES, label: t('mainPage.btnVariables') },
      ]
    : [
        { path: AppRoutes.REST_CLIENT, label: t('mainPage.btnRestClient') },
        { path: AppRoutes.HISTORY, label: t('mainPage.btnHistory') },
        { path: AppRoutes.VARIABLES, label: t('mainPage.btnVariables') },
      ];
