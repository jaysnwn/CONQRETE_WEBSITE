const fs = require('fs');
let navbar = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

navbar = navbar.replace(
  /\) : \(\s*\)\}/g,
  ") : null}"
);

fs.writeFileSync('components/layout/navbar.tsx', navbar);
console.log("Fixed syntax error");
