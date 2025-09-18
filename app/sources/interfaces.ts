import type { User } from '@supabase/supabase-js';

import { CodeLanguage, CodeVariant } from './enums';

export interface InputFields {
  id: string;
  label?: string;
  name?: string;
  value?: string;
  type: string;
  placeholder?: string;
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

export type Header = KeyValue;

export interface LoaderData {
  data: string | null;
  error: string | null;
  status?: number | null;
  codeGen?: CodeGeneratorLoaderData | null;
}

export interface KeyValue {
  id: number;
  key: string;
  value: string;
}

export interface CodeOptions {
  indentCount: number;
  indentType: 'Space' | 'Tab';
  trimRequestBody: boolean;
  followRedirect: boolean;
  includeBoilerplate: boolean;
}

export interface CodeRequestData {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  auth?: {
    type: 'basic' | 'bearer';
    username?: string;
    password?: string;
    token?: string;
  };
}

export type CodeLanguageVariants = {
  [key in CodeLanguage]: CodeVariant[];
};

export interface CodeGeneratorLoaderData {
  generatedCode: string | null;
  error: string | null;
}

export interface FetchValues {
  url?: string;
  method?: string;
  protocol?: string;
  body?: string | object;
  headers?: Header[];
  variables?: KeyValue[];
}

export interface AuthUser {
  user: User;
  accessToken: string;
  expiresAt: number | null;
}

export interface Developer {
  name: string;
  photo: string;
  gitHub: string;
}
