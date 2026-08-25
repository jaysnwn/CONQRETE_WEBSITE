const fs = require('fs');
let detailClient = fs.readFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', 'utf8');
detailClient = detailClient.replace(/\(tag, index\) =>/g, '(tag: any, index: number) =>');
fs.writeFileSync('app/(storefront)/products/[slug]/productdetailclient.tsx', detailClient, 'utf8');
console.log('Fixed typescript error');
