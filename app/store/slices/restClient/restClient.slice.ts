import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { HttpMethods, Parsers, Protocols } from '@/sources/enums';
import type { Header } from '@/sources/interfaces';

interface RestClientState {
  method: HttpMethods;
  protocol: Protocols;
  url: string;
  headers: Header[];
  parser: Parsers;
  body: string;
}

const initialState: RestClientState = {
  method: HttpMethods.GET,
  protocol: Protocols.HTTP,
  url: '',
  headers: [],
  parser: Parsers.JSON,
  body: '',
};

const restClientSlice = createSlice({
  name: 'restClient',
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<HttpMethods>) {
      state.method = action.payload;
    },
    setProtocol(state, action: PayloadAction<Protocols>) {
      state.protocol = action.payload;
    },
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setParser(state, action: PayloadAction<Parsers>) {
      state.parser = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    addHeader(state, action: PayloadAction<Header>) {
      state.headers.push(action.payload);
    },
    updateHeader(state, action: PayloadAction<Header>) {
      const updatedHeader = action.payload;

      const index = state.headers.findIndex(kv => kv.id === updatedHeader.id);

      state.headers[index] = updatedHeader;
    },
    removeHeader(state, action: PayloadAction<number>) {
      let header = [...state.headers];
      header = header.filter(kv => kv.id !== action.payload);
      state.headers = header;
    },
  },
});

export const restClientReducer = restClientSlice.reducer;
export const restClientActions = restClientSlice.actions;
