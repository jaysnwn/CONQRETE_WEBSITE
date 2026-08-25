const fs = require('fs');
let file = fs.readFileSync('app/api/admin/products/route.ts', 'utf8');

file = file.replace(
  'const payload = await request.json();',
  'const payload = await request.json();\n  console.log("PAYLOAD RECEIVED:", JSON.stringify(payload.page_content, null, 2));'
);

fs.writeFileSync('app/api/admin/products/route.ts', file);
