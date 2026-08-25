const fs = require('fs');
let productsClient = fs.readFileSync('app/(storefront)/products/productsclient.tsx', 'utf8');

// 1. Add height: 100% to outer card
productsClient = productsClient.replace(
  /transition: 'transform 0\.2s ease, box-shadow 0\.2s ease'\s*\}/,
  "transition: 'transform 0.2s ease, box-shadow 0.2s ease',\n          height: '100%'\n        }"
);

// 2. Change Badge
productsClient = productsClient.replace(
  /backgroundColor: '#0052FF', color: 'white'/g,
  "backgroundColor: '#c8ff00', color: '#000'"
);

// 3. Add flex: 1 to inner wrapper
productsClient = productsClient.replace(
  /<div style=\{\{ display: 'flex', flexDirection: 'column', padding: '0 4px' \}\}>/,
  "<div style={{ display: 'flex', flexDirection: 'column', padding: '0 4px', flex: 1 }}>"
);

// 4. Add flex spacer and change "Add to cart" to "Quick Add"
productsClient = productsClient.replace(
  /          <button \n            onClick=\{\(e\) => \{/,
  "          <div style={{ flex: 1, minHeight: '16px' }} />\n\n          <button \n            onClick={(e) => {"
);

productsClient = productsClient.replace(
  /\} \? 'Sold out' : 'Add to cart'\}/g,
  "} ? 'Sold out' : 'Quick Add'}"
);

fs.writeFileSync('app/(storefront)/products/productsclient.tsx', productsClient);


let featuredProducts = fs.readFileSync('components/home/featured-products.tsx', 'utf8');

// 1. Add height: 100% to outer card
featuredProducts = featuredProducts.replace(
  /display: 'flex',\n                  flexDirection: 'column',\n                \}\}/,
  "display: 'flex',\n                  flexDirection: 'column',\n                  height: '100%',\n                }}"
);

// 2. Add flex spacer before the button
featuredProducts = featuredProducts.replace(
  /                  \{\/\* Add to Cart - Client island below \*\/\}/,
  "                  <div style={{ flex: 1, minHeight: '16px' }} />\n\n                  {/* Add to Cart - Client island below */}"
);

fs.writeFileSync('components/home/featured-products.tsx', featuredProducts);

console.log("Files updated successfully");
