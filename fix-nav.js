const fs = require('fs');
let nav = fs.readFileSync('components/layout/navbar.tsx', 'utf8');

// 1. Keep desktop-actions visible on mobile
nav = nav.replace(/\.desktop-actions \{ display: none !important; \}/g, "");

// 2. Remove the auth buttons from the mobile menu
// We need to match from `<div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>` 
// down to the end of the mobile menu.
// Let's just use string replacement for the specific block.
const authBlockStart = "{/* dY' NEW: MOBILE SPLIT BUTTONS FOR ACCOUNT/ORDERS dY' */}";
const mobileMenuEndIndex = nav.indexOf("</div>\n          </div>\n          \n          {/* GLOBAL STYLES FOR MENU ANIMATION */}");

if (mobileMenuEndIndex > -1 && nav.includes(authBlockStart)) {
  const blockStart = nav.indexOf(authBlockStart);
  // Find the closing </div> of the padding: 2rem div which wraps the auth block
  // It's the parent of the auth block.
  // Actually, I'll just regex replace the whole auth block since it's quite distinct.
  nav = nav.replace(/\{\/\* \ud83d\udc77.*?\}\}\)\}\n\s*<\/div>/s, "");
} else {
  // Let's do a more robust regex if the above didn't match perfectly.
  // The block starts with padding: '2rem' and ends before the closing of mobile-menu
  nav = nav.replace(/<div style=\{\{ padding: '2rem'.*?<\/div>\s*<\/div>\s*<\/div>/s, "</div>\n          </div>");
}

fs.writeFileSync('components/layout/navbar.tsx', nav);
console.log("Navbar updated");
