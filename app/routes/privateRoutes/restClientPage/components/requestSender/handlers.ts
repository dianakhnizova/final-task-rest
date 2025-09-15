import type { CodeLanguage, HttpMethods, Protocols } from '@/sources/enums';
import type {
  CodeGeneratorLoaderData,
  Header,
  KeyValue,
} from '@/sources/interfaces';

import { handleServerFetch } from '@/utils/handleServerFetch';

import { handleCodeGenerator } from '../codeGenerator/handlers';

export const handleSendRequest = async (
  url: string,
  method: HttpMethods,
  protocol: Protocols,
  body: string,
  headers: Header[],
  variables: KeyValue[],
  language: CodeLanguage,
  setSearchParams: (params: URLSearchParams) => void,
  setCode: (code: CodeGeneratorLoaderData) => void
) => {
  if (!url) return;

  const headersObj = headers.reduce(
    (acc, header) => ({ ...acc, [header.key]: header.value }),
    {}
  );

  await Promise.all([
    handleServerFetch(
      url,
      method,
      protocol,
      body,
      headers,
      variables,
      setSearchParams
    ),
    handleCodeGenerator(
      { url, method, headers: headersObj, body },
      language,
      setCode
    ),
  ]);
};
