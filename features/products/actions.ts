'use server';

import {
  getProductBySlug as getProductBySlugService,
  listAdminProducts as listAdminProductsService,
  listPublicProducts as listPublicProductsService,
  toggleProductVisibility as toggleProductVisibilityService,
  toQueryResult,
} from './services/product-service';
import type { ProductDetail, ProductQueryResult, ProductSummary, ProductVisibilityInput } from './types';

export async function getPublicProducts(): Promise<ProductQueryResult<ProductSummary[]>> {
  try {
    const data = await listPublicProductsService();
    return { data, error: null };
  } catch (error) {
    return toQueryResult<ProductSummary[]>(null, error);
  }
}

export async function getProductBySlug(slug: string): Promise<ProductQueryResult<ProductDetail | null>> {
  try {
    const data = await getProductBySlugService(slug);
    return { data, error: null };
  } catch (error) {
    return toQueryResult<ProductDetail | null>(null, error);
  }
}

export async function getAdminProducts(): Promise<ProductQueryResult<ProductSummary[]>> {
  try {
    const data = await listAdminProductsService();
    return { data, error: null };
  } catch (error) {
    return toQueryResult<ProductSummary[]>(null, error);
  }
}

export async function toggleProductVisibility(input: ProductVisibilityInput): Promise<ProductQueryResult<ProductSummary | null>> {
  try {
    const data = await toggleProductVisibilityService(input);
    return { data, error: null };
  } catch (error) {
    return toQueryResult<ProductSummary | null>(null, error);
  }
}
