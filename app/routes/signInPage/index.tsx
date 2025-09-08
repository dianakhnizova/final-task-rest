import styles from './SignInPage.module.css';
import { signInPage } from '@/sources/messages/signInPage';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messages } from '@/sources/messages';
import { AppRoutes, InputID } from '@/sources/enums';
import { Link } from 'react-router';
import { buttons } from '@/sources/messages/buttons';
import { signInSchema } from '@/schemas/signInSchema';
import type { SignInForm } from '@/sources/interfaces';

export function meta() {
  return [
    { title: signInPage.metaTitle },
    { name: signInPage.metaName, content: signInPage.metaContent },
  ];
}

export default function SignInPage() {
  const { register, handleSubmit, formState } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const { inputFields } = useInputFields();

  const onSubmit: SubmitHandler<SignInForm> = async data => {
    console.log('Submit', data);
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!formState.isValid}
        buttonLabel={messages.buttons.signIn}
      >
        {inputFields
          .filter(
            field =>
              field.id === InputID.ID_1_EMAIL ||
              field.id === InputID.ID_3_PASSWORD
          )
          .map(field => (
            <Input
              key={field.id}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              onChange={field.onChange}
              name={field.id as keyof SignInForm}
              register={register}
              errorMessage={
                formState.errors[field.id as keyof SignInForm]?.message
              }
            />
          ))}
      </Form>

      <div className={styles.info}>
        <p className={styles.title}>{signInPage.infoTitle}</p>

        <Link to={AppRoutes.SIGN_UP} className={styles.link}>
          {buttons.signUp}
        </Link>
      </div>
    </div>
  );
}
