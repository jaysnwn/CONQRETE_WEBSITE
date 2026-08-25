const fs = require('fs');

let page = fs.readFileSync('app/(storefront)/about/page.tsx', 'utf8');

// Remove the lightning useEffect
page = page.replace(/useEffect\(\(\) => \{.*?\}, \[\]\);/s, '');
// If it had isDark dependency
page = page.replace(/useEffect\(\(\) => \{.*?\}, \[isDark\]\);/s, '');

// Remove the canvas elements
page = page.replace('{/* STORM CANVAS */}', '');
page = page.replace('<canvas id="stormCanvas"></canvas>', '');
page = page.replace('<div id="lightningFlash"></div>', '');

fs.writeFileSync('app/(storefront)/about/page.tsx', page);
console.log("Removed lightning");
