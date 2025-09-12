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
  REST_CLIENT = '/restClient',
}

export enum InputType {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  PASSWORD = 'password',
  E_MAIL = 'email',
}

export enum InputID {
  ID_EMAIL = 'email',
  ID_NAME = 'name',
  ID_PASSWORD = 'password',
  ID_CONFIRM_PASSWORD = 'confirmPassword',
  ID_URL = 'url',
}

export enum errorCode {
  NOT_FOUND = 404,
}

export enum ButtonType {
  SUBMIT = 'submit',
}

export enum DisplayName {
  PORTAL = 'Portal',
  BUTTON = 'Button',
  LOADER = 'Loader',
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
