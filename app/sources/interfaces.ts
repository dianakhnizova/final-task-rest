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
