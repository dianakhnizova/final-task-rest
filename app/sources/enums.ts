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

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum WrapperId {
  default = 'wrapper',
  header = 'wrapperHeader',
  footer = 'wrapperFooter',
}
