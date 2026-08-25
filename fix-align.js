const fs = require('fs');

// Fix productsclient.tsx
let pClient = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');
pClient = pClient.replace(
  /flex: 1,\s*backgroundColor: '#ffffff',/g, 
  "flex: 1, height: '100%', backgroundColor: '#ffffff',"
);
pClient = pClient.replace(
  /<div style=\{\{ display: 'flex', flexDirection: 'column', padding: '0 4px' \}\}>/g,
  "<div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px', flex: 1 }}>"
);
pClient = pClient.replace(
  /marginTop: '16px',\s*width: '100%',\s*backgroundColor: \(!mainVariant/g,
  "marginTop: 'auto', width: '100%', backgroundColor: (!mainVariant"
);
fs.writeFileSync('app/(storefront)/products/productsclient.tsx', pClient);

// Fix featured-products.tsx
let fProd = fs.readFileSync('components/home/featured-products.tsx', 'utf8');
fProd = fProd.replace(
  /display: 'flex',\s*flexDirection: 'column',\s*\}\}/g,
  "display: 'flex', flexDirection: 'column', height: '100%' }}"
);
fs.writeFileSync('components/home/featured-products.tsx', fProd);

console.log("Fixed alignments");
