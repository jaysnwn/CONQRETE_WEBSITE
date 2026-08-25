const fs = require('fs');
let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// Replace all </a> that are actually closing the <button> tags we replaced.
file = file.replace(/LOGIN\s*<\/a>/g, 'LOGIN\n</button>');
file = file.replace(/REGISTER\s*<\/a>/g, 'REGISTER\n</button>');

fs.writeFileSync('components/layout/navbar.tsx', file);
console.log("Fixed dangling </a> tags");
