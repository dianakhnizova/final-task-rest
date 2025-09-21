import { describe, expect, it } from 'vitest';
import { signUpSchema } from '../signUpSchema';

describe('signUpSchema', () => {
  it('should pass with valid data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!',
    };

    expect(() => signUpSchema.parse(validData)).not.toThrow();
  });

  it('should fail if email is invalid', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!',
    };

    expect(() => signUpSchema.parse(invalidData)).toThrow();
  });

  it('should fail if name is empty', () => {
    const invalidData = {
      name: '',
      email: 'john@example.com',
      password: 'StrongPass123!',
      confirmPassword: 'StrongPass123!',
    };

    expect(() => signUpSchema.parse(invalidData)).toThrow();
  });

  it('should fail if password is too weak', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123',
      confirmPassword: '123',
    };

    expect(() => signUpSchema.parse(invalidData)).toThrow();
  });
});
