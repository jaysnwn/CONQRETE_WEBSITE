const fs = require('fs');

let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// Replace mobile login/register buttons to open modal instead of href="/login"
file = file.replace(
  /<a href="\/login" onClick=\{\(\) => setMenuOpen\(false\)\}/g,
  '<button onClick={() => { setMenuOpen(false); setIsLoginModalOpen(true); }}'
);
file = file.replace(
  /<\/a>\n\s*<button onClick=\{\(\) => \{ setMenuOpen\(false\); setIsLoginModalOpen\(true\); \}\}/g,
  '</button>\n                  <button onClick={() => { setMenuOpen(false); setIsLoginModalOpen(true); }}'
);
file = file.replace(
  /REGISTER\n\s*<\/a>/g,
  'REGISTER\n                  </button>'
);
file = file.replace(
  /LOGIN\n\s*<\/a>/g,
  'LOGIN\n                  </button>'
);

fs.writeFileSync('components/layout/navbar.tsx', file);
console.log("Navbar mobile menu login buttons updated");
