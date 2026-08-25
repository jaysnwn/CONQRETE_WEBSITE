const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

file = file.replace(/backgroundColor: 'rgba\(0, 0, 0, 0.4\)'/g, "backgroundColor: 'rgba(0, 0, 0, 0.6)'");

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Updated backdrop darkness");
