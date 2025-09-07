import { InputID, InputType } from '@/sources/enums';
import type { InputFields } from '@/sources/interfaces';
import { input } from '@/sources/messages/input';

export const useInputFields = () => {
  const inputFields: InputFields[] = [
    {
      id: InputID.ID_1_EMAIL,
      label: input.label.email,
      type: InputType.E_MAIL,
      placeholder: input.placeholder.email,
    },
    {
      id: InputID.ID_2_NAME,
      label: input.label.name,
      type: InputType.TEXT,
      placeholder: input.placeholder.name,
    },
    {
      id: InputID.ID_3_PASSWORD,
      label: input.label.password,
      type: InputType.PASSWORD,
      placeholder: input.placeholder.password,
    },
    {
      id: InputID.ID_4_CONFIRM_PASSWORD,
      label: input.label.confirmPassword,
      type: InputType.PASSWORD,
      placeholder: input.placeholder.confirmPassword,
    },
  ];

  return { inputFields };
};
