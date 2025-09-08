import styles from './SignUpPage.module.css';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpPage } from '@/sources/messages/signUpPage';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { buttons as buttonsMessages } from '@/sources/messages/buttons';
import { Link } from 'react-router';
import { AppRoutes } from '@/sources/enums';
import { signUpSchema } from '@/schemas/signUpSchema';
import type { SignUpForm } from '@/sources/interfaces';
import { supabase } from '@/supabaseClient';
import toast from 'react-hot-toast';

export function meta() {
  return [
    { title: signUpPage.metaTitle },
    { name: signUpPage.metaName, content: signUpPage.metaContent },
  ];
}

export default function SignUpPage() {
  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const { inputFields } = useInputFields();

  const onSubmit: SubmitHandler<SignUpForm> = async data => {
    const { email, password, name } = data;

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      if (error.message.includes(toastMessages.partOfTextError2)) {
        toast.error(toastMessages.userExists);
      } else {
        toast.error(error.message || toastMessages.somethingError);
      }
      return;
    }

    if (authData.user?.identities?.length === 0) {
      toast.error(toastMessages.userExists);
      return;
    }

    toast.success(toastMessages.signUp);
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!formState.isValid}
        buttonLabel={buttonsMessages.signUp}
      >
        {inputFields.map(field => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            onChange={field.onChange}
            name={field.id as keyof SignUpForm}
            register={register}
            errorMessage={
              formState.errors[field.id as keyof SignUpForm]?.message
            }
          />
        ))}
      </Form>

      <div className={styles.info}>
        <p className={styles.title}>{signUpPage.infoTitle}</p>

        <Link to={AppRoutes.SIGN_IN} className={styles.link}>
          {buttonsMessages.signIn}
        </Link>
      </div>
    </div>
  );
}
