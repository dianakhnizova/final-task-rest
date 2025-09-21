import { signInSchema } from '@/schemas/signInSchema';
import { supabase } from '@/supabaseClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { AppRoutes, InputID, LS_KEY } from '@/sources/enums';
import type { AuthUser, SignInForm } from '@/sources/interfaces';
import {
  TOAST_DURATION,
  TOAST_DURATION_LONG,
} from '@/sources/constants/constants';
import { inputFormFields } from '@/sources/lists/inputFormFields';
import { signInPage } from '@/sources/messages/signInPage';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authError } from '@/utils/authError';
import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';
import { pageMeta } from '@/utils/metaHelpers.ts';
import styles from './SignInPage.module.css';

export const meta = pageMeta(signInPage);

export default function SignInPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useActions();
  const { setUserToStorage } = useSaveUserToLS(LS_KEY.USER, null);
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

    const { user, session } = authData;

    if (error) {
      authError(error);
      return null;
    }

    if (!user || !session) return;

    const authUser: AuthUser = {
      user,
      accessToken: session.access_token,
      expiresAt: session.expires_at ?? null,
    };

    setUser(authUser);
    setUserToStorage(authUser);

    toast.success(
      `${toastMessages.signIn}, ${authData.user?.user_metadata.name}`,
      { id: toastMessages.signInId, duration: TOAST_DURATION }
    );

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!formState.isValid}
        buttonLabel={t('buttons.signIn')}
      >
        {filteredFields.map(field => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label ? t(field.label) : undefined}
            type={field.type}
            placeholder={field.placeholder ? t(field.placeholder) : undefined}
            name={field.id as keyof SignInForm}
            register={register}
            errorMessage={
              formState.errors[field.id as keyof SignInForm]?.message
            }
          />
        ))}
      </Form>

      <div className={styles.info}>
        <p className={styles.title}>{t('signInPage.infoTitle')}</p>

        <Link to={AppRoutes.SIGN_UP} className={styles.link}>
          {t('buttons.signUp')}
        </Link>
      </div>
    </div>
  );
}
