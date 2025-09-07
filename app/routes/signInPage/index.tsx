import styles from './SignInPage.module.css';
import { signInPage } from '@/sources/messages/signInPage';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { UserForm } from '@/sources/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/schemas/userSchema';
import { messages } from '@/sources/messages';

export function meta() {
  return [
    { title: signInPage.metaTitle },
    { name: signInPage.metaName, content: signInPage.metaContent },
  ];
}

export default function SignInPage() {
  const { register, handleSubmit, formState } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
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
        buttonLabel={messages.buttons.signInButton}
      >
        {inputFields
          .filter(field => field.id === 'email' || field.id === 'password')
          .map(field => (
            <Input
              key={field.id}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              onChange={field.onChange}
              name={field.id as keyof UserForm}
              register={register}
              errorMessage={
                formState.errors[field.id as keyof UserForm]?.message
              }
            />
          ))}
      </Form>
    </div>
  );
}
