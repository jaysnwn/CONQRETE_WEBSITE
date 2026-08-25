const fs = require('fs');
let file = fs.readFileSync('components/auth/login-modal.tsx', 'utf8');

// Remove the early return
file = file.replace(/\n\s*if \(\!isOpen\) return null;\n/g, '\n');

// Add the early return right before the main return
file = file.replace(
  /\n\s*return \(\n\s*<div style=\{\{/g,
  '\n  if (!isOpen) return null;\n\n  return (\n    <div style={{'
);

fs.writeFileSync('components/auth/login-modal.tsx', file);
console.log("Fixed hook order in login-modal.tsx");
