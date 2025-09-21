import { z } from 'zod';

import { emailSchema, passwordSchema } from './schemas';

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
