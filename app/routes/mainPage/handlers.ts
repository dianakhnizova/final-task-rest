import { AppRoutes } from '@/sources/enums';

export const handleRestClient = (navigate: (path: string) => void) => {
  navigate(AppRoutes.REST_CLIENT);
};

export const handleHistory = () => {
  //todo - feat component for History
};

export const handleVariables = (navigate: (path: string) => void) => {
  navigate(AppRoutes.VARIABLES);
};
