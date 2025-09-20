import type { Database } from '@/types/supabase.ts';
import { type SupabaseClient } from '@supabase/supabase-js';

export async function getHistoryForCurrentUser(
  supabaseClient: SupabaseClient<Database>
) {
  const supabase = supabaseClient;

  const user = await getRequiredUser(supabase);

  const { data, error } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', user.id)
    .order('timestamp', { ascending: false });

  if (error) throw error;

  return data;
}

export async function addHistoryForCurrentUser(
  supabaseClient: SupabaseClient<Database>,
  data: Database['public']['Tables']['history']['Insert']
) {
  const supabase = supabaseClient;

  const user = await getRequiredUser(supabase);

  const { error } = await supabase
    .from('history')
    .insert({ ...data, user_id: user.id });

  if (error) throw error;
}

async function getRequiredUser(supabaseClient: SupabaseClient<Database>) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    throw new Error('No authenticated user found.');
  }

  return user;
}
