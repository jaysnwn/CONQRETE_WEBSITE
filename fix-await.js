const fs = require('fs');
let file = fs.readFileSync('app/(storefront)/products/[slug]/page.tsx', 'utf8');

file = file.replace(
  'const supabase = createClient();',
  'const supabase = await createClient();'
);

fs.writeFileSync('app/(storefront)/products/[slug]/page.tsx', file);
console.log("Fixed await");
