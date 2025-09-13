import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { HttpMethods } from '@/sources/enums';

interface RestClientState {
  method: HttpMethods;
  url: string;
}

const initialState: RestClientState = {
  method: HttpMethods.GET,
  url: '',
};

const restClientSlice = createSlice({
  name: 'restClient',
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<HttpMethods>) {
      state.method = action.payload;
    },
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export const restClientReducer = restClientSlice.reducer;
export const restClientActions = restClientSlice.actions;
