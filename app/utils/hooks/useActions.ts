import { authActions } from '@/store/slices/auth/auth.slice';
import { restClientActions } from '@/store/slices/restClient/restClient.slice';

import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...authActions,
  ...restClientActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
