import type { ProductDetail, ProductQueryResult, ProductSummary, ProductVisibilityInput } from '../types';
import { productVisibilitySchema } from '../validation';
import {
  getProductBySlug as getProductRowBySlug,
  listActiveProducts as listActiveProductRows,
  listAdminProducts as listAdminProductRows,
  updateProductVisibility as updateProductVisibilityRow,
} from '../repositories/product-repository';

function normalizeCategory(rawCategory: unknown): ProductSummary['category'] {
  if (!rawCategory || typeof rawCategory !== 'object') {
    return null;
  }

  const candidate = rawCategory as { name?: unknown; slug?: unknown };
  return {
    name: typeof candidate.name === 'string' ? candidate.name : null,
    slug: typeof candidate.slug === 'string' ? candidate.slug : null,
  };
}

function normalizeProductSummary(row: any): ProductSummary {
  return {
    id: row.id,
    title: row.title ?? 'Untitled product',
    slug: row.slug ?? '',
    description: row.description ?? null,
    price: typeof row.price === 'number' ? row.price : null,
    inventory_count: typeof row.inventory_count === 'number' ? row.inventory_count : null,
    is_active: Boolean(row.is_active),
    sku: typeof row.sku === 'string' ? row.sku : null,
    images: Array.isArray(row.images) ? row.images : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    category: normalizeCategory(row.category),
    created_at: row.created_at ?? null,
    updated_at: row.updated_at ?? null,
    variants: Array.isArray(row.variants) ? row.variants : [],
  };
}

function normalizeProductDetail(row: any): ProductDetail {
  return {
    ...normalizeProductSummary(row),
    variants: Array.isArray(row.variants) ? row.variants : [],
  };
}

export async function listPublicProducts(): Promise<ProductSummary[]> {
  const rows = await listActiveProductRows();
  return rows.map(normalizeProductSummary);
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const row = await getProductRowBySlug(slug);
  return row ? normalizeProductDetail(row) : null;
}

export async function listAdminProducts(): Promise<ProductSummary[]> {
  const rows = await listAdminProductRows();
  return rows.map(normalizeProductSummary);
}

export async function toggleProductVisibility(input: ProductVisibilityInput): Promise<ProductSummary | null> {
  const parsed = productVisibilitySchema.parse(input);
  const row = await updateProductVisibilityRow(parsed.id, parsed.is_active);
  return row ? normalizeProductSummary(row) : null;
}

export function toQueryResult<T>(data: T | null, error: unknown): ProductQueryResult<T> {
  if (error instanceof Error) {
    return { data: null, error: error.message };
  }

  return { data, error: 'Unable to complete the request.' };
}
