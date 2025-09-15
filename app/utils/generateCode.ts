import { CodeLanguage, HttpMethods } from '@/sources/enums';
import type { CodeRequestData } from '@/sources/interfaces';

import { CODE_TEMPLATES } from '@/sources/constants/codeGenerateConstants';
import { errors as errorMessage } from '@/sources/messages/errors';

export function generateCode(
  language: CodeLanguage,
  request: CodeRequestData
): string {
  const { url, method = HttpMethods.GET, headers = {}, body } = request;

  if (!url) return errorMessage.urlError;

  const bodyString =
    body != null
      ? typeof body === 'string'
        ? body
        : JSON.stringify(body, null, 2)
      : '';

  const template = CODE_TEMPLATES[language];

  if (!template) return errorMessage.languageError;

  return template(method, url, headers, bodyString);
}
