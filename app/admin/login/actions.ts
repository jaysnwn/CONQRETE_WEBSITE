'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get('password') || '');
  const next = String(formData.get('next') || '/admin');
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return redirect('/admin/login?error=1');
  }

  const cookieStore = await cookies();
  cookieStore.set('conqrete_admin_session', expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(next && next.startsWith('/admin') ? next : '/admin');
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('conqrete_admin_session');
  redirect('/admin/login');
}
