'use server';

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Admin client to bypass RLS for system operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitVerificationCustomer(data: {
  mobile: string;
  name?: string;
  email?: string;
  marketing_consent: boolean;
}) {
  try {
    let normalizedMobile = data.mobile.replace(/\D/g, '');
    if (normalizedMobile.length === 10) {
      normalizedMobile = `+91${normalizedMobile}`;
    } else if (normalizedMobile.length > 10 && !data.mobile.startsWith('+')) {
      normalizedMobile = `+${normalizedMobile}`;
    }

    const { data: customer, error } = await supabaseAdmin
      .from('warranty_verification_customers')
      .insert([
        {
          mobile: normalizedMobile,
          name: data.name || null,
          email: data.email || null,
          marketing_consent: data.marketing_consent,
        }
      ])
      .select('id')
      .single();

    if (error || !customer) {
      console.error("Verification customer insert error", error);
      return { success: false, error: 'Failed to save details.' };
    }

    return { success: true, customerId: customer.id };
  } catch (err) {
    console.error("Server action exception:", err);
    return { success: false, error: 'Server error occurred.' };
  }
}

export async function validateQrToken(customerId: string, token: string) {
  try {
    const cleanToken = (token || '').trim();
    
    // Check if the token exists and is active
    const { data: activeToken } = await supabaseAdmin
      .from('warranty_active_tokens')
      .select('id')
      .eq('token', cleanToken)
      .eq('is_active', true)
      .single();

    const isValid = !!activeToken;
    const resultString = isValid ? 'SUCCESS' : 'FAILED';

    // Record the event
    await supabaseAdmin
      .from('warranty_verifications')
      .insert([
        {
          customer_id: customerId,
          verification_result: resultString,
          qr_identifier: cleanToken,
        }
      ]);

    return { success: isValid, message: isValid ? 'Verified' : 'Invalid token' };
  } catch (err) {
    console.error("Server action exception:", err);
    return { success: false, message: 'Server error' };
  }
}
