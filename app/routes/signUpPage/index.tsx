import { signUpSchema } from '@/schemas/signUpSchema';
import { supabase } from '@/supabaseClient';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

import { AppRoutes } from '@/sources/enums';
import type { SignUpForm } from '@/sources/interfaces';

import {
  TOAST_DURATION,
  TOAST_DURATION_LONG,
} from '@/sources/constants/constants';
import { buttons as buttonsMessages } from '@/sources/messages/buttons';
import { signUpPage } from '@/sources/messages/signUpPage';
import { toasts as toastMessages } from '@/sources/messages/toasts';

import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { inputFormFields } from '@/components/ui/input/inputFormFields';

import { authError } from '@/utils/authError';
import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './SignUpPage.module.css';

export const meta = pageMeta(signUpPage);

export default function SignUpPage() {
  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignUpForm> = async data => {
    const { email, password, name } = data;

    toast.success(toastMessages.signUpProcess, {
      id: toastMessages.signUpProcessId,
      duration: TOAST_DURATION_LONG,
    });

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
      authError(error);
      return null;
    }

    if (authData.user?.identities?.length === 0) {
      toast.dismiss(toastMessages.signUpProcessId);
      toast.error(toastMessages.userExist, { id: toastMessages.userExistId });
      return;
    }

    toast.success(
      `${toastMessages.signUp}, ${authData.user?.user_metadata.name}`,
      { id: toastMessages.signUpProcessId, duration: TOAST_DURATION }
    );
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!formState.isValid}
        buttonLabel={buttonsMessages.signUp}
      >
        {inputFormFields.map(field => (
          <Input
            key={field.id}
            {...field}
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
