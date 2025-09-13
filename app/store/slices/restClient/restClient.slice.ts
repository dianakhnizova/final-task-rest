import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { HttpMethods } from '@/sources/enums';

interface RestClientState {
  method: HttpMethods;
  url: string;
  status: number | null;
  body: string | null;
}

const initialState: RestClientState = {
  method: HttpMethods.GET,
  url: '',
  status: null,
  body: null,
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
    setResponse(
      state,
      action: PayloadAction<{ status: number | null; body: string | null }>
    ) {
      state.status = action.payload.status;
      state.body = action.payload.body;
    },
    clearResponse(state) {
      state.status = null;
      state.body = null;
    },
  },
});

export const restClientReducer = restClientSlice.reducer;
export const restClientActions = restClientSlice.actions;
