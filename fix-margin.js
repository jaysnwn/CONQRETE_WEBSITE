const fs = require('fs');

// Fix productsclient.tsx
let pClient = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');

// Replace button marginTop: 'auto' back to '0'
pClient = pClient.replace(
  /marginTop: 'auto', width: '100%', backgroundColor: \(!mainVariant/g,
  "marginTop: '0', width: '100%', backgroundColor: (!mainVariant"
);

// Insert a flex spacer right before the button
pClient = pClient.replace(
  /<button\s+onClick=\{\(e\)/g,
  "<div style={{ flex: 1, minHeight: '16px' }} />\n            <button\n              onClick={(e)"
);

fs.writeFileSync('app/(storefront)/products/productsclient.tsx', pClient);

// Fix featured-products.tsx
let fProd = fs.readFileSync('components/home/featured-products.tsx', 'utf8');

fProd = fProd.replace(
  /marginTop: 'auto',\s*display: 'block',/g,
  "marginTop: '0', display: 'block',"
);

fProd = fProd.replace(
  /<Link\s+href=\{\`\/products\/\$\{product\.slug\}\`\}\s+style=\{\{/g,
  "<div style={{ flex: 1, minHeight: '16px' }} />\n                  <Link\n                    href={`/products/${product.slug}`}\n                    style={{"
);

fs.writeFileSync('components/home/featured-products.tsx', fProd);

console.log("Added spacer for button margins");
