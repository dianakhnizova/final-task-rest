import { signInSchema } from '@/schemas/signInSchema';
import { supabase } from '@/supabaseClient';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

import { AppRoutes, Auth, InputID } from '@/sources/enums';
import { inputFields } from '@/sources/inputFields';
import type { SignInForm } from '@/sources/interfaces';

import { buttons as buttonsMessages } from '@/sources/messages/buttons';
import { signInPage } from '@/sources/messages/signInPage';
import { toasts as toastMessages } from '@/sources/messages/toasts';

import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useActions } from '@/utils/hooks/useActions';

import styles from './SignInPage.module.css';

export function meta() {
  return [
    { title: signInPage.metaTitle },
    { name: signInPage.metaName, content: signInPage.metaContent },
  ];
}

export default function SignInPage() {
  const navigate = useNavigate();
  const { setUser } = useActions();

  const { register, handleSubmit, formState } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const filteredFields = inputFields.filter(
    ({ id }) => id === InputID.ID_EMAIL || id === InputID.ID_PASSWORD
  );

  const onSubmit: SubmitHandler<SignInForm> = async formData => {
    const { email, password } = formData;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes(toastMessages.partOfTextError1)) {
        toast.error(toastMessages.errorConfirmEmail);
      } else {
        toast.error(error.message);
      }
    } else {
      setUser(authData.user);
      localStorage.setItem(Auth.USER, JSON.stringify(authData.user));
      toast.success(toastMessages.signIn);
      navigate(AppRoutes.HOME);
    }
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!formState.isValid}
        buttonLabel={buttonsMessages.signIn}
      >
        {filteredFields.map(field => (
          <Input
            key={field.id}
            {...field}
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
          {buttonsMessages.signUp}
        </Link>
      </div>
    </div>
  );
}
