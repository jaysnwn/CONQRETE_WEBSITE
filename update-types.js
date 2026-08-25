const fs = require('fs');
let file = fs.readFileSync('features/products/types.ts', 'utf8');

file = file.replace(
  'updated_at: string | null;',
  'updated_at: string | null;\n  page_content?: any;'
);

fs.writeFileSync('features/products/types.ts', file);
console.log("Updated types");
