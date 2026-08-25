const fs = require('fs');
let file = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// Find the mobile menu part
const mobileMenuMatch = file.match(/<div className=\{\`mobile-menu \$\{menuOpen \? 'open' : ''\}\`\}([\s\S]*?)<\/nav>/);
if (mobileMenuMatch) {
    console.log("MOBILE MENU:\n", mobileMenuMatch[1]);
} else {
    console.log("Could not find mobile menu.");
}
