import { createClient as _createClient } from '@supabase/supabase-js';

// Use the base supabase-js client (no auth session management needed)
export function createClient() {
  return _createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  );
}
