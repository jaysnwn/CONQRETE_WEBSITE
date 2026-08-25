const fs = require('fs');

let file = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');

file = file.replace(
  'export default function ProductDetailClient({ product }: { product: any }) {',
  'export default function ProductDetailClient({ product, relatedProducts, reviews }: { product: any, relatedProducts?: any, reviews?: any }) {'
);

fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', file, 'utf8');
