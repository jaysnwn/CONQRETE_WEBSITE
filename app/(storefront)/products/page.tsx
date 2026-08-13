export const dynamic = 'force-dynamic';
import { getPublicProducts } from '#/features/products/actions';
import ProductsClient from './productsclient';

export default async function ProductsPage() {
  const { data: products, error } = await getPublicProducts();

  if (error) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', backgroundColor: '#ffffff', color: '#111827', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>Error Loading Products</h1>
        <p style={{ color: '#6b7280' }}>Please try again later.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', backgroundColor: '#ffffff', color: '#111827', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>No Products Found</h1>
        <p style={{ color: '#6b7280' }}>We couldn't find any products in the database.</p>
      </div>
    );
  }

  return <ProductsClient products={products} />;
}