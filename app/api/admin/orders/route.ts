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
  if (!payload.orderId) {
    return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
  }
  const supabase = createAdminClient();

  const updateData: any = {};
  if (payload.status !== undefined) updateData.status = payload.status;
  if (payload.tracking_number !== undefined) updateData.tracking_number = payload.tracking_number;
  if (payload.carrier !== undefined) updateData.carrier = payload.carrier;

  const { error } = await supabase.from('orders').update(updateData).eq('id', payload.orderId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
