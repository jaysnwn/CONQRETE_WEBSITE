import { getProductBySlug } from '#/features/products/actions';
import { notFound } from 'next/navigation';
import ProductDetailClient from './productdetailclient';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { data: product, error } = await getProductBySlug(resolvedParams.slug);

  if (error || !product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}