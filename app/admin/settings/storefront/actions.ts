'use server';

import { createAdminClient } from '#/utils/supabase/admin';
import { requirePermission, logAuditAction } from '#/utils/auth/rbac';
import { revalidatePath } from 'next/cache';

export async function uploadHeroSlide(formData: FormData) {
  try {
    await requirePermission('marketing.manage');
    
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file uploaded.');

    const adminSupabase = createAdminClient();
    
    // 1. Upload the image to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    const { error: uploadError } = await adminSupabase.storage
      .from('storefront')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 2. Get the public URL
    const { data: { publicUrl } } = adminSupabase.storage
      .from('storefront')
      .getPublicUrl(filePath);

    // 3. Get the max display_order
    const { data: maxSlide } = await adminSupabase
      .from('hero_slides')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = maxSlide ? maxSlide.display_order + 1 : 0;

    // 4. Insert into the database
    const { error: dbError } = await adminSupabase
      .from('hero_slides')
      .insert({
        image_url: publicUrl,
        display_order: nextOrder,
        is_active: true
      });

    if (dbError) throw dbError;

    await logAuditAction({
      action: 'Uploaded new hero slide',
      resourceType: 'storefront',
      result: 'success',
      newData: { image_url: publicUrl }
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function toggleHeroSlideStatus(id: string, currentStatus: boolean) {
  try {
    await requirePermission('marketing.manage');
    const adminSupabase = createAdminClient();

    const { error } = await adminSupabase
      .from('hero_slides')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) throw error;

    await logAuditAction({
      action: 'Toggled hero slide status',
      resourceType: 'storefront',
      resourceId: id,
      result: 'success',
      newData: { is_active: !currentStatus }
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteHeroSlide(id: string, imageUrl: string) {
  try {
    await requirePermission('marketing.manage');
    const adminSupabase = createAdminClient();

    // 1. Delete from database
    const { error: dbError } = await adminSupabase
      .from('hero_slides')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;

    // 2. Try to delete from storage
    const pathParts = imageUrl.split('/storefront/');
    if (pathParts.length === 2) {
      const filePath = pathParts[1];
      await adminSupabase.storage.from('storefront').remove([filePath]);
    }

    await logAuditAction({
      action: 'Deleted hero slide',
      resourceType: 'storefront',
      resourceId: id,
      result: 'success'
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function reorderHeroSlides(orderedIds: string[]) {
  try {
    await requirePermission('marketing.manage');
    const adminSupabase = createAdminClient();

    // Update each slide's display_order
    for (let i = 0; i < orderedIds.length; i++) {
      await adminSupabase
        .from('hero_slides')
        .update({ display_order: i })
        .eq('id', orderedIds[i]);
    }

    await logAuditAction({
      action: 'Reordered hero slides',
      resourceType: 'storefront',
      result: 'success'
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
