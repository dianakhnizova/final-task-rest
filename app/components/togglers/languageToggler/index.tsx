import { Form, useLoaderData } from 'react-router';

import {
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
  console.log('Current locale:', locale);
  const next = locale === Language.EN ? Language.RU : Language.EN;
  const handleSubmit = () => {
    console.log('Submitting form with language:', next);
  };

  return (
    <Form
      method={HttpMethods.POST}
      action="/set-language"
      reloadDocument={false}
      onSubmit={handleSubmit}
    >
      <input type={InputType.HIDDEN} name={InputName.LANGUAGE} value={next} />
      <Button variant={Variant.ICON} type={ButtonType.SUBMIT}>
        <LanguageIcon />
      </Button>
    </Form>
  );
};
