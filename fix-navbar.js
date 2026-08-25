const fs = require('fs');
let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');
file = file.replace(/\/signup/g, '/login');
fs.writeFileSync('components/layout/navbar.tsx', file);
