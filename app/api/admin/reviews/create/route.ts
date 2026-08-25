import { NextResponse } from 'next/server';
import { requirePermission, logAuditAction } from '#/utils/auth/rbac';
import { createAdminClient } from '#/utils/supabase/admin';

export async function POST(request: Request) {
  try {
    await requirePermission('products.edit');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();

  if (!payload.product_id || !payload.reviewer_name || !payload.rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('product_reviews')
    .insert({
      product_id: payload.product_id,
      rating: payload.rating,
      comment: payload.comment,
      reviewer_name: payload.reviewer_name,
      is_approved: true, // Manual reviews are auto-approved
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await logAuditAction({
    action: 'Review manually created',
    resourceType: 'product_review',
    resourceId: data.id,
    newData: payload,
    result: 'success',
  });

  return NextResponse.json({ success: true });
}
