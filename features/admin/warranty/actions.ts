'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getWarrantyTokens() {
  const { data, error } = await supabaseAdmin
    .from('warranty_active_tokens')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function addWarrantyToken(token: string) {
  const cleanToken = token.trim();
  if (!cleanToken) return { success: false, error: "Token cannot be empty" };
  
  const { error } = await supabaseAdmin
    .from('warranty_active_tokens')
    .insert([{ token: cleanToken, is_active: true }]);
    
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteWarrantyToken(id: string) {
  const { error } = await supabaseAdmin
    .from('warranty_active_tokens')
    .delete()
    .eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getWarrantyCustomers() {
  // Fetch verifications joined with customers
  const { data, error } = await supabaseAdmin
    .from('warranty_verifications')
    .select('*, customer:warranty_verification_customers(*)')
    .order('verified_at', { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
}

export async function setupWarrantyAdminTables() {
  // This helps the user avoid dealing with manual SQL running!
  // It attempts to run the required SQL through the admin key.
  const sql = `
    CREATE TABLE IF NOT EXISTS public.warranty_active_tokens (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        token text UNIQUE NOT NULL,
        is_active boolean DEFAULT true,
        created_at timestamptz DEFAULT now()
    );
    INSERT INTO public.warranty_active_tokens (token) VALUES ('CNQ-GENUINE-V1') ON CONFLICT DO NOTHING;
  `;
  // We can't actually run raw SQL via supabase JS without RPC, 
  // so this function is just a placeholder. The user must run the migration or 
  // I will just use inserts.
  
  // As a workaround, we can just attempt an insert to verify the table exists.
  const { error } = await supabaseAdmin.from('warranty_active_tokens').select('id').limit(1);
  return { exists: !error };
}
