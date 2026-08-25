const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

file = file.replace(/flex: '0 0 45%',/g, "flex: '0 0 45%', boxSizing: 'border-box',");
file = file.replace(/flex: '0 0 55%',/g, "flex: '0 0 55%', boxSizing: 'border-box',");

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Added border-box");
