import { z } from 'zod';

import { InputID } from '@/sources/enums';

import { validation } from '@/sources/messages/validation';

import {
  confirmPasswordSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from './schemas';

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: validation.error.confirmMessage,
    path: [InputID.ID_4_CONFIRM_PASSWORD],
  });
