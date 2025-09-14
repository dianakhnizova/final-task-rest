import { AppRoutes } from '@/sources/enums';

export const handleRestClient = (navigate: (path: string) => void) => {
  navigate(AppRoutes.REST_CLIENT);
};

export const handleHistory = (navigate: (path: string) => void) => {
  navigate(AppRoutes.HISTORY);
};

export const handleVariables = (navigate: (path: string) => void) => {
  navigate(AppRoutes.VARIABLES);
};
