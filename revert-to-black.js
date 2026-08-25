const fs = require('fs');

function applyBlackColor(filePath) {
  let file = fs.readFileSync(filePath, 'utf8');
  file = file.replace(/#0052FF/g, '#111827');
  file = file.replace(/#0014B3/g, '#111827');
  fs.writeFileSync(filePath, file);
}

applyBlackColor('app/(storefront)/products/[slug]/productdetailclient.tsx');
applyBlackColor('app/(storefront)/products/productsclient.tsx');
applyBlackColor('components/home/featured-products.tsx');
console.log("Changed all blue to black");
