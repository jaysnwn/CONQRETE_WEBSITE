'use server';

import { createClient } from '#/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function sendPhoneOtp(phone: string) {
  const supabase = await createClient();
  
  // Format phone number to E.164 if it's an Indian number without +91
  let formattedPhone = phone;
  if (/^\d{10}$/.test(phone)) {
    formattedPhone = '+91' + phone;
  } else if (!phone.startsWith('+')) {
    formattedPhone = '+' + phone;
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: formattedPhone,
  });

  if (error) {
    return { error: error.message };
  }
  return { success: true, phone: formattedPhone };
}

export async function verifyPhoneOtp(phone: string, token: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });

  if (error) {
    return { error: error.message };
  }

  // Idempotently provision the storefront customer profile/record.
  // Because this action is ONLY called via the storefront phone auth flow,
  // it safely separates storefront customers from admin users.
  // It relies on RLS and SECURITY INVOKER.
  const { error: rpcError } = await supabase.rpc('provision_storefront_customer');
  
  if (rpcError) {
    console.error('Failed to provision customer record:', rpcError);
    // Don't fail the login completely, but log it. The UI might need to handle this.
    // Ideally, we'd handle partial failure, but returning success allows the session to exist.
  }
  
  revalidatePath('/', 'layout');
  
  // We check if they have a name in their profile to determine if they are a NEW customer.
  // If no name is set, they need to complete onboarding.
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .single();
    
  return { 
    success: true,
    isNewCustomer: !profile?.full_name || profile.full_name.trim() === ''
  };
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function saveCustomerOnboarding(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const street = formData.get('street') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const pincode = formData.get('pincode') as string;

  if (!firstName || !street || !city || !state || !pincode) {
    return { error: 'Please fill out all required fields' };
  }

  // Update profiles
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: `${firstName} ${lastName}`.trim() })
    .eq('id', user.id);

  if (profileError) return { error: profileError.message };

  // Update customers
  const { error: customerError } = await supabase
    .from('customers')
    .update({ first_name: firstName, last_name: lastName })
    .eq('id', user.id);

  if (customerError) return { error: customerError.message };

  // Insert address (will become default implicitly if it's the first one, or we explicitly set it)
  const { error: addressError } = await supabase
    .from('addresses')
    .insert({
      customer_id: user.id,
      street,
      city,
      state,
      pincode,
      is_default: true,
    });

  if (addressError) return { error: addressError.message };

  revalidatePath('/', 'layout');
  redirect('/account');
}


export async function loginRazorpayReviewer(email: string, password: string) {
  if (process.env.RAZORPAY_REVIEW_MODE !== 'true') {
    return { success: false, error: 'Review mode disabled' };
  }

  const expectedEmail = process.env.RAZORPAY_TEST_EMAIL;
  const expectedPassword = process.env.RAZORPAY_TEST_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    return { success: false, error: 'Review credentials not configured' };
  }

  if (email !== expectedEmail || password !== expectedPassword) {
    return { success: false, error: 'Invalid review credentials' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
