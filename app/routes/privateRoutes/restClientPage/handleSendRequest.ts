import type { HttpMethods, Protocols } from '@/sources/enums';
import type { CodeGeneratorLoaderData, Header } from '@/sources/interfaces';

import { handleCodeGenerator } from './components/codeGenerator/handleCodeGenerator';
import { handleServerFetch } from './components/urlBox/handlers';

export const handleSendRequest = async (
  url: string,
  method: HttpMethods,
  protocol: Protocols,
  body: string,
  headers: Header[],
  setSearchParams: (params: URLSearchParams) => void,
  setCode: (code: CodeGeneratorLoaderData) => void
) => {
  if (!url) return;

  await handleServerFetch(
    url,
    method,
    protocol,
    body,
    headers,
    setSearchParams
  );

  await handleCodeGenerator(
    {
      url,
      method,
      headers: headers.reduce(
        (acc, header) => ({ ...acc, [header.key]: header.value }),
        {}
      ),
      body,
    },
    setCode
  );
};
