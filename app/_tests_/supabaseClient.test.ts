import { getServerSupabaseClient, supabase } from '@/supabaseClient';
import { describe, expect, it } from 'vitest';

describe('Supabase clients', () => {
  it('creates a browser client', () => {
    expect(supabase).toBeDefined();
    expect(typeof supabase).toBe('object');
  });

  it('creates a server client with headers', () => {
    const mockRequest = new Request('http://localhost', {
      headers: { Cookie: 'session=abc123' },
    });

    const { client, headers } = getServerSupabaseClient(mockRequest);

    expect(client).toBeDefined();
    expect(headers).toBeInstanceOf(Headers);

    headers.append('Set-Cookie', 'test=123');
    expect(headers.get('Set-Cookie')).toContain('123');
  });

  it('parses cookies from request', () => {
    const mockRequest = new Request('http://localhost', {
      headers: { Cookie: 'a=1; b=2' },
    });

    const { client } = getServerSupabaseClient(mockRequest);

    expect(client).toBeDefined();
  });
});
