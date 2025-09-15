import { z } from 'zod';

import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_UNICODE_REGEX,
} from '@/sources/constants/constants';
import { validation } from '@/sources/messages/validation';

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: validation.error.nameMessage })
  .refine(name => NAME_REGEX.test(name), {
    message: validation.error.nameMessage,
  });

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: validation.error.emailMessage })
  .refine(value => EMAIL_REGEX.test(value), {
    message: validation.error.emailLatinMessage,
  });

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: validation.error.password.tooShort })
  .refine(val => PASSWORD_UNICODE_REGEX.LETTER.test(val), {
    message: validation.error.password.noLetter,
  })
  .refine(val => PASSWORD_UNICODE_REGEX.DIGIT.test(val), {
    message: validation.error.password.noDigit,
  })
  .refine(val => PASSWORD_UNICODE_REGEX.SPECIAL.test(val), {
    message: validation.error.password.noSpecial,
  });

export const confirmPasswordSchema = z
  .string()
  .trim()
  .min(1, { message: validation.error.confirmMessage })
  .min(8, { message: validation.error.password.tooShort })
  .refine(val => PASSWORD_UNICODE_REGEX.LETTER.test(val), {
    message: validation.error.password.noLetter,
  })
  .refine(val => PASSWORD_UNICODE_REGEX.DIGIT.test(val), {
    message: validation.error.password.noDigit,
  })
  .refine(val => PASSWORD_UNICODE_REGEX.SPECIAL.test(val), {
    message: validation.error.password.noSpecial,
  });
