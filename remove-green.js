const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

file = file.replace(
  /e.currentTarget.style.borderColor = '#c8ff00';/g,
  "e.currentTarget.style.borderColor = '#111827';"
);

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Removed remaining green from OTP boxes");
