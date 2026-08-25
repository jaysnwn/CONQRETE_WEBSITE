const fs = require('fs');

function addBadge(file, productVar) {
  // Find ImageCarousel usage and add the badge OVER it, position absolute top right
  const searchStr = '<ImageCarousel ';
  if (file.includes(searchStr)) {
    // Add badge
    const badgeHtml = `
          {${productVar}.compare_at_price && ${productVar}.compare_at_price > ${productVar}.price && (
            <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, backgroundColor: '#0052FF', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
              Save Rs. {(${productVar}.compare_at_price - ${productVar}.price).toLocaleString('en-IN')}
            </div>
          )}
          <ImageCarousel `;
    return file.replace(searchStr, badgeHtml);
  }
  return file;
}

let productsClient = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');
productsClient = addBadge(productsClient, 'mainVariant'); // In productsclient, mainVariant is used
fs.writeFileSync('app/(storefront)/products/productsclient.tsx', productsClient, 'utf8');

let detailClient = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');
// In detailclient's related products, we used relProduct
detailClient = addBadge(detailClient, 'relProduct');
fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', detailClient, 'utf8');
console.log('Added badges');
