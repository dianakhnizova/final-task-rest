export interface InputFields {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export type FetchPrepare = {
  url: string;
  options: RequestInit;
};

export type FetchResponse = {
  response: Response | null;
  error: string | null;
};

export interface Header {
  key: string;
  value: string;
}

export interface LoaderData {
  data: string | null;
  error: string | null;
  status?: number | null;
}
