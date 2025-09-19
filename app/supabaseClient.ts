import type { Database } from '@/types/supabase.ts';

import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

export function getServerSupabaseClient(request: Request) {
  const headers = new Headers();
  const client = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '').map(
          ({ name, value }) => ({ name, value: value ?? '' })
        );
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append(
            'Set-Cookie',
            serializeCookieHeader(name, value, options)
          )
        );
      },
    },
  });

  return {
    client,
    headers,
  };
}
