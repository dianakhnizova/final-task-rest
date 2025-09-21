import { describe, expect, it } from 'vitest';
import { CodeLanguage, HttpMethods, Parsers, Protocols } from '@/sources/enums';
import type { CodeGeneratorLoaderData, Header } from '@/sources/interfaces';
import { restClientActions, restClientReducer } from './restClient.slice';

describe('restClientSlice', () => {
  const initialState = {
    method: HttpMethods.GET,
    protocol: Protocols.HTTP,
    url: '',
    headers: [],
    parser: Parsers.JSON,
    body: '',
    code: { generatedCode: null, error: null } as CodeGeneratorLoaderData,
    language: CodeLanguage.JAVASCRIPT,
  };

  it('should set method', () => {
    const state = restClientReducer(
      initialState,
      restClientActions.setMethod(HttpMethods.POST)
    );
    expect(state.method).toBe(HttpMethods.POST);
  });

  it('should set protocol', () => {
    const state = restClientReducer(
      initialState,
      restClientActions.setProtocol(Protocols.HTTPS)
    );
    expect(state.protocol).toBe(Protocols.HTTPS);
  });

  it('should set url', () => {
    const state = restClientReducer(
      initialState,
      restClientActions.setUrl('https://api.com')
    );
    expect(state.url).toBe('https://api.com');
  });

  it('should set parser', () => {
    const state = restClientReducer(
      initialState,
      restClientActions.setParser(Parsers.XML)
    );
    expect(state.parser).toBe(Parsers.XML);
  });

  it('should set body', () => {
    const state = restClientReducer(
      initialState,
      restClientActions.setBody('{"key": "value"}')
    );
    expect(state.body).toBe('{"key": "value"}');
  });

  it('should set code', () => {
    const codePayload: CodeGeneratorLoaderData = {
      generatedCode: 'code',
      error: null,
    };
    const state = restClientReducer(
      initialState,
      restClientActions.setCode(codePayload)
    );
    expect(state.code).toEqual(codePayload);
  });

  it('should set language', () => {
    const state = restClientReducer(
      initialState,
      restClientActions.setLanguage(CodeLanguage.PYTHON)
    );
    expect(state.language).toBe(CodeLanguage.PYTHON);
  });

  it('should add header', () => {
    const header: Header = {
      id: 1,
      key: 'Content-Type',
      value: 'application/json',
    };
    const state = restClientReducer(
      initialState,
      restClientActions.addHeader(header)
    );
    expect(state.headers).toContainEqual(header);
  });

  it('should update header', () => {
    const initial = {
      ...initialState,
      headers: [{ id: 1, key: 'A', value: 'B' }],
    };
    const updated: Header = { id: 1, key: 'A', value: 'C' };
    const state = restClientReducer(
      initial,
      restClientActions.updateHeader(updated)
    );
    expect(state.headers).toContainEqual(updated);
  });

  it('should remove header', () => {
    const initial = {
      ...initialState,
      headers: [{ id: 1, key: 'A', value: 'B' }],
    };
    const state = restClientReducer(initial, restClientActions.removeHeader(1));
    expect(state.headers).toHaveLength(0);
  });

  it('should replace state with setState', () => {
    const newState = { ...initialState, url: 'https://new.com' };
    const state = restClientReducer(
      initialState,
      restClientActions.setState(newState)
    );
    expect(state.url).toBe('https://new.com');
  });
});
