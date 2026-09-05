import { MetadataRoute } from 'next';
import { getPublicProducts } from '#/features/products/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://conqrete.in';

  // 1. Fetch active products
  const { data: products } = await getPublicProducts();

  const productUrls: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updated_at || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 2. Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/products/chargers`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/products/cables`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/products/power-banks`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/support/faqs`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/support/contact`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/support/warranty`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/support/shipping-returns`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/legal/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/terms-of-use`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [...staticRoutes, ...productUrls];
}
