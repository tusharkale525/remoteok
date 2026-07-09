import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getSupabaseClient(): ReturnType<typeof createBrowserClient<Database>> {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabaseClient;
}

export function createSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}