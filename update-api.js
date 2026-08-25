const fs = require('fs');
let file = fs.readFileSync('app/api/admin/products/route.ts', 'utf8');

// In POST
file = file.replace(
  'seo_description: payload.seo_description,',
  'seo_description: payload.seo_description,\n    page_content: payload.page_content || {},'
);

// In PATCH
file = file.replace(
  'seo_description: payload.seo_description,',
  'seo_description: payload.seo_description,\n    page_content: payload.page_content || {},'
);

fs.writeFileSync('app/api/admin/products/route.ts', file);
console.log('API Updated');
