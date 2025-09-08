import styles from './SignUpPage.module.css';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { UserForm } from '@/sources/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpPage } from '@/sources/messages/signUpPage';
import { messages } from '@/sources/messages';
import { Link } from 'react-router';
import { AppRoutes } from '@/sources/enums';
import { buttons } from '@/sources/messages/buttons';
import { signUpSchema } from '@/schemas/signUpSchema';

export function meta() {
  return [
    { title: signUpPage.metaTitle },
    { name: signUpPage.metaName, content: signUpPage.metaContent },
  ];
}

export default function SignUpPage() {
  const { register, handleSubmit, formState } = useForm<UserForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const { inputFields } = useInputFields();

  const onSubmit: SubmitHandler<UserForm> = async data => {
    console.log('Submit', data);
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!formState.isValid}
        buttonLabel={messages.buttons.signUp}
      >
        {inputFields.map(field => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            onChange={field.onChange}
            name={field.id as keyof UserForm}
            register={register}
            errorMessage={formState.errors[field.id as keyof UserForm]?.message}
          />
        ))}
      </Form>

      <div className={styles.info}>
        <p className={styles.title}>{signUpPage.infoTitle}</p>

        <Link to={AppRoutes.SIGN_IN} className={styles.link}>
          {buttons.signIn}
        </Link>
      </div>
    </div>
  );
}
