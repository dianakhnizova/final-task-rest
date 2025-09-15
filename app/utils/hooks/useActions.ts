import { authActions } from '@/store/slices/auth/auth.slice';
import { restClientActions } from '@/store/slices/restClient/restClient.slice';
import { settingsActions } from '@/store/slices/settings/settings.slice.ts';

import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...authActions,
  ...restClientActions,
  ...settingsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
