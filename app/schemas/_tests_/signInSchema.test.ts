import { describe, expect, it } from 'vitest';
import { signInSchema } from '../signInSchema';

describe('signInSchema', () => {
  it('should pass with valid email and password', () => {
    const validData = {
      email: 'test@example.com',
      password: 'StrongPass123!',
    };

    expect(() => signInSchema.parse(validData)).not.toThrow();
  });

  it('should fail if email is invalid', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'StrongPass123!',
    };

    expect(() => signInSchema.parse(invalidData)).toThrow();
  });

  it('should fail if password is invalid', () => {
    const invalidData = {
      email: 'test@example.com',
      password: '123',
    };

    expect(() => signInSchema.parse(invalidData)).toThrow();
  });

  it('should fail if email and password are missing', () => {
    const invalidData = {};

    expect(() => signInSchema.parse(invalidData)).toThrow();
  });
});
