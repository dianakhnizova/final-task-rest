import { InputID, InputType } from '../../../sources/enums';
import type { InputFields } from '../../../sources/interfaces';
import { input } from '../../../sources/messages/input';

export const inputFormFields: InputFields[] = [
  {
    id: InputID.ID_EMAIL,
    label: input.label.email,
    type: InputType.E_MAIL,
    placeholder: input.placeholder.email,
  },
  {
    id: InputID.ID_NAME,
    label: input.label.name,
    type: InputType.TEXT,
    placeholder: input.placeholder.name,
  },
  {
    id: InputID.ID_PASSWORD,
    label: input.label.password,
    type: InputType.PASSWORD,
    placeholder: input.placeholder.password,
  },
  {
    id: InputID.ID_CONFIRM_PASSWORD,
    label: input.label.confirmPassword,
    type: InputType.PASSWORD,
    placeholder: input.placeholder.confirmPassword,
  },
];
