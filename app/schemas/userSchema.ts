import { z } from 'zod';
import {
  confirmPasswordSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from './schemas';
import { validation } from '@/sources/messages/validation';
import { InputID } from '@/sources/enums';

export const userSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: validation.error.confirmMessage,
    path: [InputID.ID_4],
  });
