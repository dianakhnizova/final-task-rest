import { useTranslation } from 'react-i18next';
import { InputID, InputType } from '../../sources/enums';
import type { InputFields } from '../../sources/interfaces';

export const useInputFormFields = (): InputFields[] => {
  const { t } = useTranslation();

  return [
    {
      id: InputID.ID_EMAIL,
      label: t('label.email'),
      type: InputType.E_MAIL,
      placeholder: t('placeholder.email'),
    },
    {
      id: InputID.ID_NAME,
      label: t('label.name'),
      type: InputType.TEXT,
      placeholder: t('placeholder.name'),
    },
    {
      id: InputID.ID_PASSWORD,
      label: t('label.password'),
      type: InputType.PASSWORD,
      placeholder: t('placeholder.password'),
    },
    {
      id: InputID.ID_CONFIRM_PASSWORD,
      label: t('label.confirmPassword'),
      type: InputType.PASSWORD,
      placeholder: t('placeholder.confirmPassword'),
    },
  ];
};
