import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This browser client automatically handles cookie synchronization
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);