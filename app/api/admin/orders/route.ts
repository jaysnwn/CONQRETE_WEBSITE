import { NextResponse } from 'next/server';
import { requirePermission, logAuditAction } from '#/utils/auth/rbac';
import { createAdminClient } from '#/utils/supabase/admin';

export async function PATCH(request: Request) {
  try {
    await requirePermission('orders.edit');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
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

  await logAuditAction({
    action: 'Order edited',
    resourceType: 'order',
    resourceId: payload.orderId,
    newData: updateData,
    result: 'success',
  });

  return NextResponse.json({ ok: true });
}
