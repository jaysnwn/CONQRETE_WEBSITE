const fs = require('fs');

let productsClient = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');
productsClient = productsClient.replace(/\{mainVariant\.compare_at_price/g, '{mainVariant?.compare_at_price');
productsClient = productsClient.replace(/\(mainVariant\.compare_at_price/g, '(mainVariant?.compare_at_price');
fs.writeFileSync('app/(storefront)/products/productsclient.tsx', productsClient, 'utf8');

let detailClient = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');
// In detailclient, wait, relProduct doesn't have a ?. because relProduct itself is mapped.
// But wait! Does relProduct have compare_at_price directly?
// In my replace code I wrote `relProduct.compare_at_price`. That's fine if relProduct exists.
// BUT relProduct.compare_at_price might not exist. That evaluates to undefined which is safe.
// Wait, the products in relatedProducts... wait, in the loop: `relatedProducts.map(relProduct => ...)`
// But what about the `productsclient.tsx`? `mainVariant` could be undefined if a product has no variants!
