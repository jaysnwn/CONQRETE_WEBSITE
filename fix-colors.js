const fs = require('fs');
let file = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');

// Replace blue stars with black/grey
file = file.replace(/color: '#0052FF'/g, "color: '#111827'");
file = file.replace(/color: '#0014B3'/g, "color: '#111827'");
file = file.replace(/backgroundColor: '#0052FF'/g, "backgroundColor: '#111827'");
file = file.replace(/backgroundColor: '#0014B3'/g, "backgroundColor: '#111827'");

fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', file);
console.log("Updated colors in productdetailclient.tsx");
