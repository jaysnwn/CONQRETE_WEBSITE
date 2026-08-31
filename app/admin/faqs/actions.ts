'use server'

import fs from 'fs/promises';
import path from 'path';
import { FAQ } from '#/app/(storefront)/faqs/faq-data';

export async function saveFaqData(newFaqs: FAQ[]) {
  try {
    const filePath = path.join(process.cwd(), 'app', '(storefront)', 'faqs', 'faq-data.ts');
    
    const fileContent = `export type Category = 'ALL' | 'GENERAL' | 'ORDERS & PAYMENTS' | 'SHIPPING' | 'RETURNS & REFUNDS' | 'WARRANTY' | 'PRODUCTS' | 'SUPPORT';

export const CATEGORIES: Category[] = [
  'ALL',
  'GENERAL',
  'ORDERS & PAYMENTS',
  'SHIPPING',
  'RETURNS & REFUNDS',
  'WARRANTY',
  'PRODUCTS',
  'SUPPORT'
];

export interface FAQ {
  id: string;
  category: Category;
  question: string;
  answer: string[];
  highlight?: string;
  links?: { text: string; url: string }[];
}

export const FAQ_DATA: FAQ[] = ${JSON.stringify(newFaqs, null, 2)};
`;

    await fs.writeFile(filePath, fileContent, 'utf-8');
    return { success: true };
  } catch (err: any) {
    console.error('Error saving FAQ data:', err);
    return { error: err.message };
  }
}

export async function getFaqData() {
  try {
    // Read directly from file to bypass any static import caching issues during runtime edits
    const filePath = path.join(process.cwd(), 'app', '(storefront)', 'faqs', 'faq-data.ts');
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Extract the JSON portion from the file content
    const dataMatch = content.match(/export const FAQ_DATA: FAQ\[\] = (\[[\s\S]*\]);/);
    if (dataMatch && dataMatch[1]) {
      return JSON.parse(dataMatch[1]) as FAQ[];
    }
    
    return [];
  } catch (err) {
    console.error('Error reading FAQ data:', err);
    return [];
  }
}
