import { NAME_REGEX, PASSWORD_REGEX } from '@/sources/constants';
import { validation } from '@/sources/messages/validation';
import { z } from 'zod';

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
  .email({ message: validation.error.emailMessage });

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: validation.error.password.message1 })
  .refine(password => PASSWORD_REGEX.UPPERCASE.test(password), {
    message: validation.error.password.message2,
  })
  .refine(password => PASSWORD_REGEX.LOWERCASE.test(password), {
    message: validation.error.password.message3,
  })
  .refine(password => PASSWORD_REGEX.DIGIT.test(password), {
    message: validation.error.password.message4,
  })
  .refine(password => PASSWORD_REGEX.SPECIAL.test(password), {
    message: validation.error.password.message5,
  });

export const confirmPasswordSchema = z
  .string()
  .trim()
  .min(1, { message: validation.error.confirmMessage })
  .refine(password => PASSWORD_REGEX.UPPERCASE.test(password), {
    message: validation.error.password.message2,
  })

  .refine(password => PASSWORD_REGEX.LOWERCASE.test(password), {
    message: validation.error.password.message3,
  })
  .refine(password => PASSWORD_REGEX.DIGIT.test(password), {
    message: validation.error.password.message4,
  })
  .refine(password => PASSWORD_REGEX.SPECIAL.test(password), {
    message: validation.error.password.message5,
  });
