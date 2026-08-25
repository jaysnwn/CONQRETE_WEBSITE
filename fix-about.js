const fs = require('fs');
let page = fs.readFileSync('app/(storefront)/about/page.tsx', 'utf8');

// Replace fragment with wrapper
page = page.replace('<>', '<div className="dark-theme-override">');
page = page.replace('</>', '</div>');

// Replace lightning colors
page = page.replace(
  "const c1 = isDark ? 'rgba(200,255,0,.5)' : 'rgba(232,0,13,.5)';",
  "const c1 = 'rgba(200,255,0,.5)';"
);
page = page.replace(
  "const c2 = isDark ? 'rgba(200,255,0,.8)' : 'rgba(232,0,13,.8)';",
  "const c2 = 'rgba(200,255,0,.8)';"
);
page = page.replace(
  "const fc = isDark ? 'rgba(200,255,0,0.1)' : 'rgba(232,0,13,0.07)';",
  "const fc = 'rgba(200,255,0,0.08)';"
);

fs.writeFileSync('app/(storefront)/about/page.tsx', page);
console.log("Updated about page");
