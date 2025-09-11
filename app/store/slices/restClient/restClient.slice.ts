import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Methods } from '@/sources/enums';

interface RestClientState {
  method: Methods;
}

const initialState: RestClientState = {
  method: Methods.GET,
};

const restClientSlice = createSlice({
  name: 'restClient',
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<Methods>) {
      state.method = action.payload;
    },
  },
});

export const restClientReducer = restClientSlice.reducer;
export const restClientActions = restClientSlice.actions;
