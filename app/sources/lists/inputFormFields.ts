import { InputID, InputType } from '../enums';
import type { InputFields } from '../interfaces';

export const inputFormFields: InputFields[] = [
  {
    id: InputID.ID_EMAIL,
    label: 'label.email',
    type: InputType.E_MAIL,
    placeholder: 'placeholder.email',
  },
  {
    id: InputID.ID_NAME,
    label: 'label.name',
    type: InputType.TEXT,
    placeholder: 'placeholder.name',
  },
  {
    id: InputID.ID_PASSWORD,
    label: 'label.password',
    type: InputType.PASSWORD,
    placeholder: 'placeholder.password',
  },
  {
    id: InputID.ID_CONFIRM_PASSWORD,
    label: 'label.confirmPassword',
    type: InputType.PASSWORD,
    placeholder: 'placeholder.confirmPassword',
  },
];
