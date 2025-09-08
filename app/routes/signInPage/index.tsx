import styles from './SignInPage.module.css';
import { signInPage } from '@/sources/messages/signInPage';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { buttons as buttonsMessages } from '@/sources/messages/buttons';
import { AppRoutes, Auth, InputID } from '@/sources/enums';
import { Link, useNavigate } from 'react-router';
import { signInSchema } from '@/schemas/signInSchema';
import type { SignInForm } from '@/sources/interfaces';
import { supabase } from '@/supabaseClient';
import { useActions } from '@/utils/hooks/useActions';
import toast from 'react-hot-toast';

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
    mode: 'onChange',
  });

  const { inputFields } = useInputFields();

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
          {buttonsMessages.signUp}
        </Link>
      </div>
    </div>
  );
}
