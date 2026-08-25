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
  
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });

  if (error) {
    return { error: error.message };
  }

  // Check if they need a profile record? Next steps could handle that.
  
  revalidatePath('/', 'layout');
  return { success: true };
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
