import { NextResponse } from 'next/server';
import { requirePermission, logAuditAction } from '#/utils/auth/rbac';
import { createAdminClient } from '#/utils/supabase/admin';

export async function POST(request: Request) {
  try {
    await requirePermission('products.create');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
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

  await logAuditAction({
    action: 'Category created',
    resourceType: 'category',
    resourceId: data.id,
    newData: payload,
    result: 'success',
  });

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  try {
    await requirePermission('products.delete');
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
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await logAuditAction({
    action: 'Category deleted',
    resourceType: 'category',
    resourceId: id,
    result: 'success',
  });

  return NextResponse.json({ success: true });
}
