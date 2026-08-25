const fs = require('fs');

function applyAcidColor(filePath) {
  let file = fs.readFileSync(filePath, 'utf8');

  // Replace black/white badges with acid/black badges.
  
  // In productdetailclient.tsx (Main price section)
  // Current: backgroundColor: '#111827', color: '#ffffff', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700
  file = file.replace(
    /backgroundColor: '#111827', color: '#ffffff', padding: '4px 10px', borderRadius: '999px'/g,
    "backgroundColor: '#c8ff00', color: '#111827', padding: '4px 10px', borderRadius: '999px'"
  );

  // In all product cards (top-left absolute badge)
  // Current: backgroundColor: '#111827', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', zIndex: 10
  file = file.replace(
    /backgroundColor: '#111827', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px'/g,
    "backgroundColor: '#c8ff00', color: '#111827', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px'"
  );

  // Sometimes there's no zIndex in the string if it's the "You May Also Like"
  // Let's just do a regex for the absolute positioned badge:
  file = file.replace(
    /<div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#111827', color: 'white'/g,
    "<div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#c8ff00', color: '#111827'"
  );

  fs.writeFileSync(filePath, file);
}

applyAcidColor('app/(storefront)/products/[slug]/productdetailclient.tsx');
applyAcidColor('app/(storefront)/products/productsclient.tsx');
applyAcidColor('components/home/featured-products.tsx');

console.log("Updated 'Save Rs.' badges to Acid Yellow-Green (#c8ff00)");
