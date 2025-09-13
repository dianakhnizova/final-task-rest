import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { HttpMethods } from '@/sources/enums';
import type { Header } from '@/sources/interfaces';

interface RestClientState {
  method: HttpMethods;
  url: string;
  status: number | null;
  body: string | null;
  headers: Header[];
}

const initialState: RestClientState = {
  method: HttpMethods.GET,
  url: '',
  headers: [],
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
    addHeader(state) {
      state.headers.push({ key: '', value: '' });
    },
    updateHeader(
      state,
      action: PayloadAction<{ index: number; key: string; value: string }>
    ) {
      const { index, key, value } = action.payload;
      state.headers[index] = { key, value };
    },
    removeHeader(state, action: PayloadAction<number>) {
      state.headers.splice(action.payload, 1);
    },
  },
});

export const restClientReducer = restClientSlice.reducer;
export const restClientActions = restClientSlice.actions;
