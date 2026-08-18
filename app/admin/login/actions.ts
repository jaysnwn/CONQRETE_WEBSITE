'use server';

import { redirect } from 'next/navigation';
import { createClient } from '#/utils/supabase/server';

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const next = String(formData.get('next') || '/admin');

  if (!email || !password) {
    return redirect('/admin/login?error=1');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/admin/login?error=1');
  }

  redirect(next && next.startsWith('/admin') ? next : '/admin');
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
