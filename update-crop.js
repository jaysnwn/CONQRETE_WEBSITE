const fs = require('fs');
let file = fs.readFileSync('components/admin/product-form.tsx', 'utf8');

file = file.replace(
  '<ImageUploader \n          images={pageContent.small_banners || []}',
  '<ImageUploader \n          aspectRatio={16/9}\n          images={pageContent.small_banners || []}'
);

file = file.replace(
  '<ImageUploader \n          images={pageContent.large_banner ? [pageContent.large_banner] : []}',
  '<ImageUploader \n          aspectRatio={21/9}\n          images={pageContent.large_banner ? [pageContent.large_banner] : []}'
);

fs.writeFileSync('components/admin/product-form.tsx', file);
console.log("Updated product-form with crop ratios");
