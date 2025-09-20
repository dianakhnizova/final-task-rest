import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CodeLanguage, HttpMethods, Parsers, Protocols } from '@/sources/enums';
import type { CodeGeneratorLoaderData, Header } from '@/sources/interfaces';

export interface RestClientState {
  method: HttpMethods;
  protocol: Protocols;
  url: string;
  headers: Header[];
  parser: Parsers;
  body: string;
  code: CodeGeneratorLoaderData;
  language: CodeLanguage;
}

const initialState: RestClientState = {
  method: HttpMethods.GET,
  protocol: Protocols.HTTP,
  url: '',
  headers: [],
  parser: Parsers.JSON,
  body: '',
  code: {
    generatedCode: null,
    error: null,
  },
  language: CodeLanguage.JAVASCRIPT,
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
    setCode(state, action: PayloadAction<CodeGeneratorLoaderData>) {
      state.code = action.payload;
    },
    setLanguage(state, action: PayloadAction<CodeLanguage>) {
      state.language = action.payload;
    },

    addHeader(state, action: PayloadAction<Header>) {
      state.headers.push(action.payload);
    },
    updateHeader(state, action: PayloadAction<Header>) {
      const updatedHeader = action.payload;

      const index = state.headers.findIndex(
        header => header.id === updatedHeader.id
      );

      state.headers[index] = updatedHeader;
    },
    removeHeader(state, action: PayloadAction<number>) {
      let headers = [...state.headers];
      headers = headers.filter(header => header.id !== action.payload);
      state.headers = headers;
    },
  },
});

export const restClientReducer = restClientSlice.reducer;
export const restClientActions = restClientSlice.actions;
