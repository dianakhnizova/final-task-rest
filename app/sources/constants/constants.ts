import { CodeLanguage, CodeVariant } from '../enums';
import type { CodeLanguageVariants, CodeOptions } from '../interfaces';

export const WRAPPER_ROOT_PORTAL_ID = 'root-portal';
export const GITHUB_PROJECT_URL =
  'https://github.com/dianakhnizova/final-task-rest';
export const RSS_COURSE_URL = 'https://rs.school/courses/reactjs';
export const PASSWORD_UNICODE_REGEX = {
  LETTER: /\p{L}/u,
  DIGIT: /\p{N}/u,
  SPECIAL: /[^ \p{L}\p{N}]/u,
};

export const NAME_REGEX = /^[A-ZА-ЯЁ]/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const LOGO_URL = './snake.svg';
export const TOAST_DURATION = 4000;
export const TOAST_DURATION_LONG = 20000;

export const FETCH_ABORT_TIMEOUT_MS = 10000;

export const CODE_LANGUAGE_VARIANTS: CodeLanguageVariants = {
  [CodeLanguage.CURL]: [CodeVariant.CURL],
  [CodeLanguage.JAVASCRIPT]: [CodeVariant.FETCH, CodeVariant.XHR],
  [CodeLanguage.NODEJS]: [CodeVariant.NATIVE, CodeVariant.REQUEST],
  [CodeLanguage.PYTHON]: [CodeVariant.HTTP_CLIENT],
  [CodeLanguage.JAVA]: [CodeVariant.HTTP_CLIENT],
  [CodeLanguage.CSHARP]: [CodeVariant.HTTP_CLIENT],
  [CodeLanguage.GO]: [CodeVariant.HTTP],
  [CodeLanguage.XHR]: [CodeVariant.XHR],
};

export const CodeDefaultOptions: CodeOptions = {
  indentCount: 0,
  indentType: 'Space',
  trimRequestBody: false,
  followRedirect: false,
  includeBoilerplate: false,
};

export const GITHUB_ALEXANDR = 'https://github.com/alvi0avcc';
export const GITHUB_DIANA = 'https://github.com/dianakhnizova';
export const GITHUB_ALEX = 'https://github.com/VavilovAlex';

export const ABOUT_PROJECT =
  'Our project is a browser-based REST client that allows you to send HTTP requests, view responses, and save request history. We designed it to be developer-friendly: it supports variables, multiple methods (GET, POST, etc.), code generation for requests, and a flexible interface. The goal of the project is to simplify API testing and exploration directly in the browser without additional tools.';

export const DEFAULT_BODY = `{
	"name": "Add your name in the body"
}`;
