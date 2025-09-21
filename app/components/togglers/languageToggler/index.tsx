import { Form, useLoaderData } from 'react-router';
import {
  AppRoutes,
  ButtonType,
  HttpMethods,
  InputName,
  InputType,
  Language,
  Variant,
} from '@/sources/enums';
import { LanguageIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export const LanguageToggler = () => {
  const { locale } = useLoaderData<{ locale: string }>();
  const next = locale === Language.EN ? Language.RU : Language.EN;

  return (
    <Form method={HttpMethods.POST} action={AppRoutes.LANGUAGE}>
      <input type={InputType.HIDDEN} name={InputName.LANGUAGE} value={next} />

      <Button variant={Variant.ICON} type={ButtonType.SUBMIT}>
        <LanguageIcon />
      </Button>
    </Form>
  );
};
