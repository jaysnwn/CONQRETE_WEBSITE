const fs = require('fs');
let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// The duplicate is `onClick={() => setProfileOpen(false)}` right before `>` of the button tag.
file = file.replace(
  /onMouseOut=\{\(e\) => e.currentTarget.style.backgroundColor = 'transparent'\} \s*\n\s*onClick=\{\(\) => setProfileOpen\(false\)\}\s*\n\s*>/g,
  "onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}\n                      >"
);

fs.writeFileSync('components/layout/navbar.tsx', file);
console.log("Fixed duplicate onClick in navbar");
