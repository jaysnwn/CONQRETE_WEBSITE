import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '#/utils/supabase/admin';

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('conqrete_admin_session')?.value;

  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();

  if (!payload.id || payload.is_approved === undefined) {
    return NextResponse.json({ error: 'Missing ID or status' }, { status: 400 });
  }

  const { error } = await supabase
    .from('product_reviews')
    .update({ is_approved: payload.is_approved })
    .eq('id', payload.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
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
    .from('product_reviews')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
