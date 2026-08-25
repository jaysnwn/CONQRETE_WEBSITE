const fs = require('fs');
let content = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');

// replace Add to cart text with Quick Add
content = content.replace(
  /\) \? 'Sold out' : 'Add to cart'\}/g,
  ") ? 'Sold out' : 'Quick Add'}"
);

// insert flex spacer before the button
content = content.replace(
  /          <button \n            onClick=\{\(e\) => \{/,
  "          <div style={{ flex: 1, minHeight: '16px' }} />\n\n          <button \n            onClick={(e) => {"
);

fs.writeFileSync('app/(storefront)/products/productsclient.tsx', content);
console.log("Updated productsclient.tsx");
