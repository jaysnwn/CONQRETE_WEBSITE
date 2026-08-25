const fs = require('fs');
let file = fs.readFileSync('app/api/admin/products/route.ts', 'utf8');

// Fix duplicate in POST
file = file.replace(
  'seo_description: payload.seo_description,\n    page_content: payload.page_content || {},\n    page_content: payload.page_content || {},',
  'seo_description: payload.seo_description,\n    page_content: payload.page_content || {},'
);

// Add to PATCH safely using regex matching the exact context
file = file.replace(
  /seo_description:\s*payload\.seo_description,\s*\};/g,
  'seo_description: payload.seo_description,\n    page_content: payload.page_content || {},\n  };'
);

fs.writeFileSync('app/api/admin/products/route.ts', file);
