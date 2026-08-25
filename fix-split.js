const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

file = file.replace(/maxWidth: '850px'/g, "maxWidth: '950px'");
file = file.replace(/minHeight: '480px'/g, "minHeight: '520px'");
file = file.replace(/flex: '0 0 65%'/g, "flex: '0 0 55%'"); // Reduce left side slightly to give form space
file = file.replace(/flex: '0 0 35%'/g, "flex: '0 0 45%'"); // Increase right side
file = file.replace(/padding: '40px 32px'/g, "padding: '40px'"); // Even padding

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Adjusted split to prevent cutoff");
