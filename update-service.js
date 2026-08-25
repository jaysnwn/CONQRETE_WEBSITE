const fs = require('fs');
let file = fs.readFileSync('features/products/services/product-service.ts', 'utf8');

file = file.replace(
  'updated_at: row.updated_at ?? null,',
  'updated_at: row.updated_at ?? null,\n      page_content: row.page_content || {},'
);

fs.writeFileSync('features/products/services/product-service.ts', file);
console.log("Updated product-service");
