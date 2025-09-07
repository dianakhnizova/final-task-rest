export interface InputFields {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface UserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
