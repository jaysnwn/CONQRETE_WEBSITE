import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '#/utils/supabase/admin';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('conqrete_admin_session')?.value;

  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();

  const slug = payload.slug || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name: payload.name, slug, description: payload.description }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('conqrete_admin_session')?.value;

  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
