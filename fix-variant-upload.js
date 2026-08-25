const fs = require('fs');

let file = fs.readFileSync('components/admin/product-form.tsx', 'utf8');

const search = `onChange={(val) => { const current = (variant.image_url || '').split(',').map(s => s.trim()).filter(Boolean); const newUrls = typeof val === 'function' ? val(current) : val; updateVariant(index, { image_url: newUrls.join(',') }); }}`;

const replace = `onChange={(val) => { 
  setVariants(items => items.map((item, itemIndex) => {
    if (itemIndex !== index) return item;
    const current = (item.image_url || '').split(',').map(s => s.trim()).filter(Boolean);
    const newUrls = typeof val === 'function' ? val(current) : val;
    return { ...item, image_url: newUrls.join(',') };
  }));
}}`;

if (file.includes(search)) {
  file = file.replace(search, replace);
  fs.writeFileSync('components/admin/product-form.tsx', file);
  console.log("Successfully fixed variant image upload closure issue.");
} else {
  console.log("Could not find the target string.");
}
