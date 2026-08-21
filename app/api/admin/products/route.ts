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

  const productRow = {
    title: payload.title,
    slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    description: payload.description,
    images: payload.images,
    tags: payload.tags,
    category_id: payload.category_id || null,
    is_active: payload.is_active,
    vendor: payload.vendor,
    seo_title: payload.seo_title,
    seo_description: payload.seo_description,
  };

  const { data, error } = await supabase.from('products').insert(productRow).select('id').single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const productId = data.id;

  if (payload.variants?.length) {
    const variantRows = payload.variants.map((variant: any) => {
      const generatedSku = variant.sku || `${payload.slug}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      return {
        product_id: productId,
        color: variant.color,
        capacity: variant.capacity,
        price: variant.price,
        compare_at_price: variant.compare_at_price,
        sku: generatedSku,
        barcode: variant.barcode || null,
        weight_grams: variant.weight_grams,
        requires_shipping: variant.requires_shipping !== undefined ? variant.requires_shipping : true,
        image_url: variant.image_url,
        cost_price: variant.cost_price,
        stock_quantity: variant.stock_quantity,
        specifications: variant.specifications,
      };
    });

    const { error: variantError } = await supabase.from('product_variants').insert(variantRows);
    if (variantError) {
      await supabase.from('products').delete().eq('id', productId);
      return NextResponse.json({ error: variantError.message }, { status: 500 });
    }
  }

  await logAuditAction({
    action: 'Product created',
    resourceType: 'product',
    resourceId: productId,
    newData: payload,
    result: 'success',
  });

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  try {
    await requirePermission('products.edit');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();
  const productId = payload.id;

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required for update' }, { status: 400 });
  }

  const productRow = {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    images: payload.images,
    tags: payload.tags,
    category_id: payload.category_id || null,
    is_active: payload.is_active,
    vendor: payload.vendor,
    seo_title: payload.seo_title,
    seo_description: payload.seo_description,
  };

  const { error } = await supabase.from('products').update(productRow).eq('id', productId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Handle variants: easiest is to delete all existing and insert the new ones
  if (payload.variants) {
    await supabase.from('product_variants').delete().eq('product_id', productId);

    if (payload.variants.length > 0) {
      const variantRows = payload.variants.map((variant: any) => {
        const generatedSku = variant.sku || `${payload.slug}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        return {
          product_id: productId,
          color: variant.color,
          capacity: variant.capacity,
          price: variant.price,
          compare_at_price: variant.compare_at_price,
          sku: generatedSku,
          barcode: variant.barcode || null,
          weight_grams: variant.weight_grams,
          requires_shipping: variant.requires_shipping !== undefined ? variant.requires_shipping : true,
          image_url: variant.image_url,
          cost_price: variant.cost_price,
          stock_quantity: variant.stock_quantity,
          specifications: variant.specifications || {},
        };
      });

      const { error: variantError } = await supabase.from('product_variants').insert(variantRows);
      if (variantError) {
        return NextResponse.json({ error: variantError.message }, { status: 500 });
      }
    }
  }

  await logAuditAction({
    action: 'Product edited',
    resourceType: 'product',
    resourceId: productId,
    newData: payload,
    result: 'success',
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  try {
    await requirePermission('products.delete');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();
  const productId = payload.id;

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required for deletion' }, { status: 400 });
  }

  // Deleting the product will automatically delete variants if ON DELETE CASCADE is set.
  // If not, we should delete variants first to avoid foreign key constraints.
  await supabase.from('product_variants').delete().eq('product_id', productId);
  const { error } = await supabase.from('products').delete().eq('id', productId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAuditAction({
    action: 'Product deleted',
    resourceType: 'product',
    resourceId: productId,
    result: 'success',
  });

  return NextResponse.json({ ok: true });
}
