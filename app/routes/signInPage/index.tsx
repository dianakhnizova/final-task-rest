import { signInSchema } from '@/schemas/signInSchema';
import { supabase } from '@/supabaseClient';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router';

import { AppRoutes, Auth, InputID } from '@/sources/enums';
import type { SignInForm } from '@/sources/interfaces';

import {
  TOAST_DURATION,
  TOAST_DURATION_LONG,
} from '@/sources/constants/constants';
import { buttons as buttonsMessages } from '@/sources/messages/buttons';
import { signInPage } from '@/sources/messages/signInPage';
import { toasts as toastMessages } from '@/sources/messages/toasts';

import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { inputFormFields } from '@/components/ui/input/inputFormFields';

import { authError } from '@/utils/authError';
import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';
import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './SignInPage.module.css';

export const meta = pageMeta(signInPage);

export default function SignInPage() {
  const navigate = useNavigate();

  const { setUser } = useActions();
  const { setUserToStorage } = useSaveUserToLS(Auth.USER, null);
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirect') || AppRoutes.HOME;

  const { register, handleSubmit, formState } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const filteredFields = inputFormFields.filter(
    ({ id }) => id === InputID.ID_EMAIL || id === InputID.ID_PASSWORD
  );

  const onSubmit: SubmitHandler<SignInForm> = async formData => {
    const { email, password } = formData;

    toast.success(toastMessages.signCheck, {
      id: toastMessages.signInId,
      duration: TOAST_DURATION_LONG,
    });

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      authError(error);
      return null;
    }

    setUser(authData.user);
    setUserToStorage(authData.user);

    toast.success(
      `${toastMessages.signIn}, ${authData.user?.user_metadata.name}`,
      { id: toastMessages.signInId, duration: TOAST_DURATION }
    );

    navigate(redirectTo);
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
