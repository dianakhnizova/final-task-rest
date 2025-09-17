export enum Variant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  ICON = 'icon',
}

export enum AppRoutes {
  HOME = '/',
  PRIVATE = '',
  ABOUT = '/about',
  NOT_FOUND = '*',
  SIGN_IN = '/signIn',
  SIGN_UP = '/signUp',
  VARIABLES = '/variables',
  HISTORY = '/history',
  REST_CLIENT = '/restClient',
  FETCH = 'fetch',
}

export enum InputType {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  PASSWORD = 'password',
  E_MAIL = 'email',
  HIDDEN = 'hidden',
}

export enum InputID {
  ID_EMAIL = 'email',
  ID_NAME = 'name',
  ID_PASSWORD = 'password',
  ID_CONFIRM_PASSWORD = 'confirmPassword',
  ID_URL = 'url',
  ID_HEADER_KEY = 'header_key',
  ID_HEADER_VALUE = 'header_value',
  ID_METHOD = 'method',
  ID_PROTOCOL = 'protocol',
  ID_BODY = 'body',
  ID_HEADERS = 'headers',
  ID_VARIABLES = 'variables',
}

export enum ErrorCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,

  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum ButtonType {
  SUBMIT = 'submit',
}

export enum DisplayName {
  PORTAL = 'Portal',
  BUTTON = 'Button',
  LOADER = 'Waiting Loader',
}

export enum Auth {
  USER = 'user',
}

export enum AuthErrors {
  USER_EXIST = 'user_already_exists',
  CREDENTIALS_INVALID = 'invalid_credentials',
  NOT_CONFIRMED = 'email_not_confirmed',
}

export enum WrapperId {
  default = 'wrapper',
  header = 'wrapperHeader',
  footer = 'wrapperFooter',
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum Language {
  EN = 'en',
  RU = 'ru',
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
}

export enum ContentType {
  JSON = 'application/json',
  XML = 'application/xml',
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  OCTET_STREAM = 'application/octet-stream',
  PDF = 'application/pdf',
  ZIP = 'application/zip',
  FORM_DATA = 'multipart/form-data',
  PLAIN_TEXT = 'text/plain',
  HTML = 'text/html',
  CSS = 'text/css',
  CSV = 'text/csv',
  JAVASCRIPT = 'text/javascript',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  SVG = 'image/svg+xml',
  WEBP = 'image/webp',
  MPEG_AUDIO = 'audio/mpeg',
  WAV = 'audio/wav',
  MP4 = 'video/mp4',
  MPEG_VIDEO = 'video/mpeg',
}

export enum InputName {
  URL = 'url',
  METHOD = 'method',
  PROTOCOL = 'protocol',
  BODY = 'body',
  HEADERS = 'headers',
  VARIABLES = 'variables',
}

export enum Protocols {
  HTTP = 'http://',
  HTTPS = 'https://',
}

export enum Parsers {
  JSON = 'json',
  TEXT = 'text',
  RAW = 'raw',
  HTML = 'html',
  XML = 'xml',
}

export enum HttpStatusText {
  OK = 'OK',
  CREATED = 'Created',
  NO_CONTENT = 'No Content',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  BAD_GATEWAY = 'Bad Gateway',
  SERVICE_UNAVAILABLE = 'Service Unavailable',
  UNKNOWN = 'Unknown',
}

export enum CodeLanguage {
  CURL = 'curl',
  JAVASCRIPT = 'JavaScript',
  XHR = 'XHR',
  NODEJS = 'nodejs',
  PYTHON = 'python',
  JAVA = 'java',
  CSHARP = 'csharp',
  GO = 'go',
}

export enum CodeVariant {
  FETCH = 'fetch',
  XHR = 'xhr',
  NATIVE = 'native',
  REQUEST = 'request',
  HTTP_CLIENT = 'http-client',
  CURL = 'curl',
  HTTP = 'http',
  NET_HTTP = 'net-http',
}

export enum LoaderStatus {
  LOADING = 'loading',
  SUBMITTING = 'submitting',
}
