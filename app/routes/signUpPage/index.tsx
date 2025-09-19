import { signUpSchema } from '@/schemas/signUpSchema';
import { supabase } from '@/supabaseClient';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { AppRoutes } from '@/sources/enums';
import type { SignUpForm } from '@/sources/interfaces';
import { TOAST_DURATION_LONG } from '@/sources/constants/constants';
import { signUpPage } from '@/sources/messages/signUpPage';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { authError } from '@/utils/authError';
import { useInputFormFields } from '@/utils/hooks/useInputFormFields';
import { pageMeta } from '@/utils/metaHelpers.ts';
import styles from './SignUpPage.module.css';

export const meta = pageMeta(signUpPage);

export default function SignUpPage() {
  const { t } = useTranslation();
  const inputFormFields = useInputFormFields();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

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
        emailRedirectTo: `${window.location.origin}/${AppRoutes.SIGN_IN}`,
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

    setModalMessage(
      `${toastMessages.signUp}, ${authData.user?.user_metadata.name}`
    );
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!formState.isValid}
        buttonLabel={t('buttons.signUp')}
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
        <p className={styles.title}>{t('signUpPage.infoTitle')}</p>

        <Link to={AppRoutes.SIGN_IN} className={styles.link}>
          {t('buttons.signIn')}
        </Link>
      </div>
    </div>
  );
}
