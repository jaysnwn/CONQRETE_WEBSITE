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

  const code = payload.code?.trim().toUpperCase();
  if (!code) return NextResponse.json({ error: 'Discount code is required' }, { status: 400 });

  const { data, error } = await supabase
    .from('discount_codes')
    .insert([{
      code,
      discount_type: payload.discount_type,
      discount_value: payload.discount_value,
      min_purchase_amount: payload.min_purchase_amount || 0,
      usage_limit: payload.usage_limit || null,
      expires_at: payload.expires_at ? new Date(payload.expires_at).toISOString() : null,
      is_active: payload.is_active ?? true
    }])
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
    .from('discount_codes')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
