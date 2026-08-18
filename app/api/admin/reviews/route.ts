import { NextResponse } from 'next/server';
import { requirePermission, logAuditAction } from '#/utils/auth/rbac';
import { createAdminClient } from '#/utils/supabase/admin';

export async function PATCH(request: Request) {
  try {
    await requirePermission('products.edit');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
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

  await logAuditAction({
    action: 'Review updated',
    resourceType: 'product_review',
    resourceId: payload.id,
    newData: { is_approved: payload.is_approved },
    result: 'success',
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  try {
    await requirePermission('products.edit');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
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

  await logAuditAction({
    action: 'Review deleted',
    resourceType: 'product_review',
    resourceId: id,
    result: 'success',
  });

  return NextResponse.json({ success: true });
}
