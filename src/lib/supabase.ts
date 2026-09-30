import { createClient } from '@supabase/supabase-js';

// Use standard vite env pattern or fallback to the provided keys
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://dfgtguygdpxmxdafsczr.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mbT86Xh0vuJOZsbLHqjcAA_m0uUkKFD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
